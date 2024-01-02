import { Slider } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { statuses } from "../utils/Style";
import SliderCard from "./SliderCard";

const FilterSection = () => {
  const [category, setcategory] = useState("Fruits");
  const products = useSelector((state) => state.products);

  return (
    <div className="w-full flex items-start justify-start flex-col">
      <div className="w-full flex items-center justify-between">
        <div className="text flex-col items-start justify-start gap-1">
          <p className="text-2xl text-headingColor font-bold">Out Hot Dishes</p>
          <div className="w-40 h-1 rounded-md bg-orange-500"></div>
        </div>
      </div>
      <div className="w-full  overflow-x-scroll pt-6 flex items-center justify-center gap-6 py-8">
        {statuses &&
          statuses.map((data, i) => (
            <FilterCard
              key={data.id}
              data={data}
              category={category}
              setCategory={setcategory}
              index={i}
            />
          ))}
      </div>

      <div className="w-full flex items-center justify-evenly flex-wrap gap-4 mt-12">
        {products &&
          products
            .filter((data) => data.product_category === category)
            .map((data, i) => <SliderCard key={i} data={data} index={i} />)}
      </div>
    </div>
  );
};

export const FilterCard = ({ data, index, category, setCategory }) => {
  const isCategorySelected = category === data.category;

  return (
    <div
      key={index}
      onClick={() => {
        setCategory(data.category);
      }}
      className={`group w-28 min-w-[128px] cursor-pointer rounded-md py-6
          ${isCategorySelected ? "bg-red-500" : "bg-white"}
          hover:bg-red-500 shadow-md flex flex-col items-center justify-center gap-4
        `}
    >
      <div
        className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center
            group-hover:bg-white ${
              isCategorySelected ? "bg-white" : "bg-red-500"
            }`}
      >
        <FastfoodIcon
          className={`${
            isCategorySelected ? "bg-white" : "bg-red-500"
          } group-hover:text-red-500`}
          style={{ fontSize: 24, color: isCategorySelected ? "red" : "white" }}
        />
      </div>
      <p
        className={`text-xl font-semibold ${
          isCategorySelected ? "text-white" : "text-textColor"
        } group-hover:text-white`}
      >
        {data.title}
      </p>
    </div>
  );
};

export default FilterSection;
