import { useDispatch, useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ClearIcon from "@mui/icons-material/Clear";
import { setCartOff } from "../context/actions/displayCartAction";
import { useEffect, useState } from "react";
import { setCartItems } from "../context/actions/cartAction";
import { baseURL, getAllCartItems, increaseItemQuantity } from "../api";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import axios from "axios";

// Cart component
const Cart = ({ data }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    let tot = 0;
    if (cart) {
      cart.forEach((item) => {
        tot += item.product_price * item.quantity;
      });
      setTotal(tot);
    }
  }, [cart]);

  const handleCheakOut = () => {
    const data = {
      user: user,
      cart: cart,
      total: total,
    };
    axios
      .post(`${baseURL}/api/products/create-checkout-session`, { data })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => console.log("Checkout Error:", err));
  };

  useEffect(() => {
    if (data) {
      setTotal(data.product_price * data.quantity);
    }
  }, [data]);

  return (
    <Box className="fixed z-50 top-0 right-0 w-500 md:w-480 bg-lightOverlay backdrop-blur-md shadow-md h-screen">
      <div className="w-full flex items-center justify-between py-4 pb-12 px-6">
        <IconButton
          className="cursor-pointer"
          onClick={() => dispatch(setCartOff())}
        >
          <ChevronRightIcon fontSize="inherit" />
        </IconButton>
        <Typography variant="h6" className="text-black font-semibold">
          Your Cart
        </Typography>
        <IconButton className="cursor-pointer">
          <ClearIcon fontSize="inherit" />
        </IconButton>
      </div>
      <div className="flex-1 flex flex-col items-start justify-start rounded-t-3xl bg-zinc-900 h-full py-6 gap-3 relative">
        {cart && cart.length > 0 ? (
          <>
            <div className="flex flex-col w-full items-start justify-start gap-3 h-[65%] overflow-y-scroll scrollbar-none px-4">
              {cart.map((item, i) => (
                <CartItemCard
                  key={i}
                  index={i}
                  data={item}
                  user={user}
                  dispatch={dispatch}
                />
              ))}
            </div>
            <div className="bg-zinc-800 rounded-t-[60px] w-full h-[35%] flex flex-col items-center justify-center px-4 py-6 gap-24">
              <div className="w-full flex items-center justify-evenly">
                <p className="text-3xl text-zinc-500 font-semibold">Total</p>
                <p className="text-3xl text-orange-500 font-semibold">
                  <span className="text-primary">₹</span>
                  {total}
                </p>
              </div>
              <div
                className="bg-orange-400 w-[70%] px-4 py-3 text-xl
        text-white font-semibold hover:bg-orange-500
        drop-shadow-md rounded-2xl"
                onClick={handleCheakOut}
              >
                {" "}
                cheakout{" "}
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl text-primary font-bold">Empty Cart</h1>
          </>
        )}
      </div>
      <div className="bg-zinc-800 rounded-t-[60px] w-full h-[35%] flex flex-col items-center justify-center px-4 py-6 gap-24">
        <div className="w-full flex items-center justify-evenly">
          <p className="text-3xl text-zinc-500 font-semibold">Total</p>
          <p className="text-3xl text-orange-500 font-semibold">
            <span className="text-primary">₹</span>
            {total}
          </p>
        </div>
      </div>
    </Box>
  );
};

// CartItemCard component
export const CartItemCard = ({ index, data, user, dispatch }) => {
  const itemTotal = data.product_price * data.quantity;

  // Function to decrement the quantity of an item in the cart
  const decrementCart = (productId) => {
    console.log("Decrementing cart for prodsssssssuct ID:", productId);
    increaseItemQuantity(user?.user_id, productId, "decrement").then((data) => {
      console.log("Updated cart:", data);
      getAllCartItems(user?.user_id).then((items) => {
        console.log("All cart items:", items);
        dispatch(setCartItems(items));
      });
    });
  };
  // Function to increment the quantity of an item in the cart
  const incrementCart = (productId) => {
    console.log("Incrementing cart for prssssssssssssssoduct ID:", productId);
    increaseItemQuantity(user?.user_id, productId, "increment").then((data) => {
      console.log("Updated cart:", data);
      getAllCartItems(user?.user_id).then((items) => {
        console.log("All cart items:", items);
        dispatch(setCartItems(items));
      });
    });
  };

  return (
    <div
      key={index}
      className="w-full flex items-center justify-start bg-zinc-800
rounded-md drop-shadow-md px-1 gap-2
"
    >
      <img
        src={data?.imageURL}
        className="w-24 h-24 object-cover rounded-md"
        alt={data.product_name}
      />
      <div className="flex-1 flex flex-col items-start justify-between">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-start">
            <h1 className="text-lg text-primary font-semibold">
              {data.product_name}
            </h1>
            <p className="text-sm text-zinc-500">{data.product_category}</p>
          </div>
          <div className="flex items-center gap-2">
            <IconButton
              className="p-0 cursor-pointer"
              style={{ color: 'white' }} 
              onClick={() => decrementCart(data.productId)}
            >
              <RemoveCircleOutlineIcon fontSize="inherit" />
            </IconButton>
            <Typography variant="body2" className="text-primary">
              {data.quantity}
            </Typography>
            <IconButton
              className="p-0 cursor-pointer"
              style={{ color: 'white' }} 
              onClick={() => incrementCart(data.productId)}
            >
              <AddCircleOutlineIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <Typography variant="body2" className="text-orange-500 font-semibold">
            ₹{itemTotal}
            <h1>dd</h1>
          </Typography>
        </div>
      </div>
    </div>
  );
};
export default Cart;
