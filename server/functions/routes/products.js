const router = require("express").Router();
const express = require("express");
const admin = require("firebase-admin");
const db = admin.firestore();
db.settings({ignoreUndefinedProperties: true});
const stripe = require("stripe")(process.env.STRIPE_KEY);
// Create a new product
router.post("/create", async (req, res) => {
  try {
    const id = Date.now() + Math.floor(Math.random() * 1000).toString();
    const data = {
      productId: id,
      product_name: req.body.product_name,
      product_category: req.body.product_category,
      product_price: req.body.product_price,
      imageURL: req.body.imageURL,
    };

    const response = await db.collection("products").doc(`/${id}/`).set(data);
    return res.status(200).send({success: true, data: response});
  } catch (err) {
    return res.status(500).send({success: false, msg: `Error: ${err}`});
  }
});

// Get all products
router.get("/all", async (req, res) => {
  (async () => {
    try {
      const query = db.collection("products");
      const response = [];
      await query.get().then((querySnap) => {
        const docs = querySnap.docs;
        docs.map((doc) => {
          response.push({...doc.data()});
        });
        return response;
      });
      return res.status(200).send({success: true, data: response});
    } catch (err) {
      return res.send({success: false, msg: `Error: ${err}`});
    }
  })();
});

// Delete a product
router.delete("/delete/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    await db
        .collection("products")
        .doc(`/${productId}/`)
        .delete()
        .then((result) => {
          return res.status(200).send({success: true, data: result});
        });
  } catch (err) {
    return res.send({success: false, msg: `Error: ${err}`});
  }
});

// create a cart
router.post("/addToCart/:userId", async (req, res) => {
  const userId = req.params.userId;
  const productId = req.body.productId;

  try {
    const doc = await db
        .collection("cartItem")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}/`)
        .get();

    if (doc.data()) {
      const quantity = doc.data().quantity + 1;
      const updatedItem = await db
          .collection("cartItem")
          .doc(`/${userId}/`)
          .collection("items")
          .doc(`/${productId}/`)
          .update({quantity});
      return res.status(200).send({success: true, data: updatedItem});
    } else {
      const data = {
        productId: productId,
        product_name: req.body.product_name,
        product_category: req.body.product_category,
        product_price: req.body.product_price,
        imageURL: req.body.imageURL,
        quantity: 1,
      };
      const addItem = await db
          .collection("cartItem")
          .doc(`/${userId}/`)
          .collection("items")
          .doc(`/${productId}/`)
          .set(data);
      return res.status(200).send({success: true, data: addItem});
    }
  } catch (err) {
    console.error(err);
    return res.send({success: false, msg: `Error: ${err}`});
  }
});

// /update cart to increase and decrese the quantity
router.post("/updateCart/:user_id", async (req, res) => {
  const userId = req.params.user_id;
  const productId = req.query.productId;
  const type = req.query.type;
  try {
    const doc = await db
        .collection("cartItem")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productId}/`)
        .get();

    if (doc.data()) {
      if (type === "increment") {
        const quantity = doc.data().quantity + 1;
        const updatedItem = await db
            .collection("cartItem")
            .doc(`/${userId}/`)
            .collection("items")
            .doc(`/${productId}/`)
            .update({quantity});
        return res.status(200).send({success: true, data: updatedItem});
      } else {
        if (doc.data().quantity === 1) {
          await db
              .collection("cartItem")
              .doc(`/${userId}/`)
              .collection("items")
              .doc(`/${productId}/`)
              .delete()
              .then((result) => {
                return res.status(200).send({success: true, data: result});
              });
        } else {
          const quantity = doc.data().quantity - 1;
          const updatedItem = await db
              .collection("cartItem")
              .doc(`/${userId}/`)
              .collection("items")
              .doc(`/${productId}/`)
              .update({quantity});
          return res.status(200).send({success: true, data: updatedItem});
        }
      }
    }
  } catch (err) {
    console.error(err);
    return res.send({success: false, msg: `Error: ${err}`});
  }
});

// Get all cart items for a user
router.get("/getCartItems/:user_id", async (req, res) => {
  const userId = req.params.user_id;
  try {
    const query = db
        .collection("cartItem")
        .doc(`/${userId}/`)
        .collection("items");
    const response = [];

    const querySnap = await query.get();
    const docs = querySnap.docs;

    docs.forEach((doc) => {
      response.push({...doc.data()});
    });

    return res.status(200).send({success: true, data: response});
  } catch (err) {
    console.error(err);
    return res.status(500).send({success: false, msg: `Error: ${err}`});
  }
});

router.post("/create-checkout-session", async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      user_id: req.body.data.user.user_id,
      cart: JSON.stringify(req.body.data.cart),
      total: req.body.data.total,
    },
  });

  const line_items = req.body.data.cart.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.product_name,
          images: [item.imageURL],
          metadata: {
            id: item.productId,
          },
        },
        unit_amount: item.product_price * 100,
      },
      quantity: item.quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {allowed_countries: ["IN"]},
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {amount: 0, currency: "inr"},
          display_name: "Free Shipping",
          delivery_estimate: {
            minimum: {unit: "hour", value: 2},
            maximum: {unit: "hour", value: 4},
          },
        },
      },
    ],
    phone_number_collection: {enabled: true},
    line_items,
    customer: customer.id,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/cheakout-success`,
    cancel_url: `${process.env.CLIENT_URL}/`,
  });
  res.send({url: session.url});
});
// stripe
let endpointSecret;

console.log("test");
// endpointSecret = process.env.WEBHOOK_SECRET;
router.post(
    "/webhook",
    express.raw({type: "application/json"}),
    (req, res) => {
      const sig = req.headers["stripe-signature"];

      let eventType;
      let data;

      if (endpointSecret) {
        let event;
        try {
          event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        } catch (err) {
          console.error(err);
          res.status(400).send(`Webhook Error: ${err.message}`);
          return;
        }
        data = event.data.object;
        eventType = event.type;
      } else {
        data = req.body.data.object;
        eventType = req.body.type;
        console.log(data);
      }

      // Handle the event
      if (eventType === "checkout.session.completed") {
        stripe.customers
            .retrieve(data.customer)
            .then((customer) => {
              console.log("customer details", customer);
              console.log("data", data);
              createOrder(customer, data, res);
            })
            .catch((error) => {
              console.error("Error retrieving customer:", error);
              // Handle the error as needed
            });
      }

      // Return a 200 response to acknowledge receipt of the event
      res.send().end();
    },
);

// createorder
const createOrder = async (customer, intent, res) => {
  console.log("inside the orderrrrrr");
  try {
    const orderId = Date.now();
    const data = {
      intentId: intent.id,
      orderId,
      amount: intent.amount_total,
      created: intent.created,
      payment_method_types: intent.payment_method_types,
      status: intent.payment_status,
      customer: intent.customer_details,
      shipping_details: intent.shipping_details,
      userId: customer.metadata.user_id,
      items: JSON.parse(customer.metadata.cart),
      total: customer.metadata.total,
      sts: "preparing",
    };

    await db.collection("orders").doc(`${orderId}`).set(data);

    await deleteCart(
        customer.metadata.user_id,
        JSON.parse(customer.metadata.cart),
    );

    console.log("*********Order created successfully*********");

    return res.status(200).send({success: true});
  } catch (err) {
    console.error("Error creating order:", err);
    return res.status(500).send("Internal Server Error");
  }
};

const deleteCart = async (userId, items) => {
  console.log("inside the deleteeeee");
  console.log(userId);
  console.log("************************************");

  for (const data of items) {
    console.log(
        "----------------Inside----------------",
        userId,
        data.productId,
    );

    try {
      await db
          .collection("cartItem")
          .doc(`${userId}`)
          .collection("items")
          .doc(`${data.productId}`)
          .delete();

      console.log("----------------Success----------------");
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  }
};

// oders
router.get("/orders", async (req, res) => {
  (async () => {
    try {
      const query = db.collection("orders");
      const response = [];
      await query.get().then((querySnap) => {
        const docs = querySnap.docs;
        docs.map((doc) => {
          response.push({...doc.data()});
        });
        return response;
      });
      return res.status(200).send({success: true, data: response});
    } catch (err) {
      return res.send({success: false, msg: `Error: ${err}`});
    }
  })();
});

// update the order status
router.post("/updateOrder/:order_id", async (req, res) => {
  const order_id = req.params.order_id;
  const sts = req.query.sts;

  try {
    const updatedItem = await db
        .collection("orders")
        .doc(`${order_id}`)
        .update({sts});

    return res.status(200).send({success: true, data: updatedItem});
  } catch (err) {
    return res.send({success: false, msg: `Error: ${err}`});
  }
});


module.exports = router;
