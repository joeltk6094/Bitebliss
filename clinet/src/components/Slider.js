import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../assets/css/wipperstyles.css";
import "swiper/css/bundle";
import { useSelector } from "react-redux";
import SliderCard from "./SliderCard";

const Slider = () => {
  const products = useSelector((state) => state.products);
  const [fruits, setFruits] = useState([]);

  useEffect(() => {
    if (products) {
      const filteredFruits = products.filter((data) => 
        data.product_category && data.product_category.toLowerCase() === "fruits"
      );
      console.log("All Products:", products);
      console.log("Filtered Fruits:", filteredFruits);
      setFruits(filteredFruits);
    }
  }, [products]);

  return (
    <div className="w-full  h-72 pt-24">
      <Swiper
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={true}
        className="mySwiper"
      >
        {fruits.map((data, i) => (
          <SwiperSlide key={i}>
            <SliderCard key={i} data={data} index={i}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
