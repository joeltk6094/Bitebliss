import React from "react";
import Aboutus from "./Aboutus";
import BubbleEffect from "./BubbleEffect";
import { MouseImage } from "./MouseImage";
import { MenuLamp } from "./MenuLamp";
import GrenBlue from "./GrenBlue";
import Header from "./Header";
import ServiceCard from "./Serviceicons";
import Footer from "./Footer";

const Service = () => {
  return (
    <div>
      <Header />
      <ServiceCard />
      <MouseImage />
      <Aboutus />
      <GrenBlue />
      <MenuLamp />
      <Footer/>
    </div>
  );
};

export default Service;
