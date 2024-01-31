import axios from "axios";

export const baseURL = "https://us-central1-cockie-44bc1.cloudfunctions.net/app";

export const validateUserJWtToken = async (token) => {
  try {
    const res = await axios.get(`${baseURL}/api/users/jwtVerification`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

//add new prodducts
export const addNewProduct = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/products/create`, { ...data });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/all`);
    return res.data.data;
  } catch (err) {
    // Log the error for debugging purposes
    console.error("Error fetching products:", err);

    // Optionally, you can throw the error to let the calling code handle it
    throw err;
  }
};

//delete a product
export const deleteAProducts = async (productId) => {
  try {
    const res = await axios.delete(
      `${baseURL}/api/products/delete/${productId}`
    );
    return res.data.data;
  } catch (err) {
    return null;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/users/all`);
    console.log("API Response:", res.data); // Log the response
    return res.data.data;
  } catch (err) {
    console.error("Error fetching users:", err);
    return null;
  }
};

//add item to cart

export const addNewItemToCart = async (user_id, data) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/addToCart/${user_id}`,
      { ...data }
    );
    return res.data.data;
  } catch (err) {
    return null;
  }
};

//getAllCartItems
export const getAllCartItems = async (user_id) => {
  try {
    const res = await axios.get(
      `${baseURL}/api/products/getCartItems/${user_id}`
    );
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// cart increment
export const increaseItemQuantity = async (user_id, productId, type) => {
  console.log(user_id, productId, type);
  try {
    const res = await axios.post(
      `${baseURL}/api/products/updateCart/${user_id}`,
      null,
      { params: { productId: productId, type: type } }
    );
    console.log("API Response:", res);
    return res.data.data;
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
};

//orders

export const getAllOrder = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/orders/`);
    return res.data.data;
  } catch (err) {
    return null;
  }
};

// update the order status
export const updateOrderSts = async (order_id, sts) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/updateOrder/${order_id}`,
      null,
      { params: { sts: sts } }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

