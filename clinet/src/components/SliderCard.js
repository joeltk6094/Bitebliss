import React from "react";
import { IconButton } from "@mui/material";
import BasketIcon from "@mui/icons-material/AddShoppingCart";
import { styled } from "@mui/system";
import { addNewItemToCart, getAllCartItems } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../context/actions/cartAction";

const RupeeText = styled("p")({
  fontSize: "1.5rem",
  fontWeight: "bold",
  color: "#ff0000",
});

const StyledIconButton = styled(IconButton)({
  width: "3rem",
  height: "3rem",
  backgroundColor: "#ff0000",
  borderRadius: "50%",
  position: "absolute",
  top: "-2rem",
  right: "1rem",
  cursor: "pointer",
});

const SliderCard = ({ data, index }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const sendToCart = () => {
    alert("Added to the cart");
    addNewItemToCart(user?.user_id, data).then((res) => {
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
      });
    });
  };

  return (
    <div className="bg-lightOverlay hover:drop-shadow-lg backdrop-blur-md rounded-xl flex items-center justify-between relative px-4 py-2 w-full md:w-340 md:min-w-350 gap-3">
      <img src={data.imageURL} className="w-40 h-40 object-contain" alt="" />
      <div className="relative pt-12">
        <p className="text-xl text-headingColor font-semibold">
          {data.product_name}
        </p>
        <RupeeText>₹{parseFloat(data.product_price).toFixed(2)}</RupeeText>
        <StyledIconButton onClick={sendToCart}>
          <BasketIcon style={{ fontSize: "2rem", color: "#fff" }} />
        </StyledIconButton>
      </div>
    </div>
  );
};

export default SliderCard;
