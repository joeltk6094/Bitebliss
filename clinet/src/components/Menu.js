import React from "react";
import MenuHero from "./MenuHero";
import MenuCard from "./MenuCard";
import Menufood from "./Menufood";
import MenuCategory from "./MenuCategory";
import Header from "./Header";

const Menu = () => {
  return (
    <div>
      <div className="p-12">
      <Header/>
      </div>
      
      <MenuHero />
      <MenuCard />
      <Menufood />
      <MenuCategory />
    </div>
  );
};

export default Menu;
