import React from "react";
import Delivery from "../assets/img/delivery.png";
import HeroBg from "../assets/img/heroBg.png";
import { randomData } from "../utils/Style";

function Home() {
  return (
    
    <div className=" container mx-auto py-8 px-2 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col items-start justify-start gap-10">
          <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
            <p className="text-base text-orange-500 font-semibold">
              Bike Delivery
            </p>
            <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
              <img
                src={Delivery}
                className="w-full h-full object-contain"
                alt="delivery"
              />
            </div>
          </div>

          <p className="text-4xl  md:text-6xl font-sans font-extrabold tracking-wider text-headingColor">
            The Fastest Delivery in{" "}
            <span className="text-orange-600">Your City</span>
          </p>

          <p className="text-lg text-textColor">
          Welcome to Fresh Fruits Express – your hub for swift and sensational fruit deliveries! Savor nature's bounty with the fastest service in town. From farm to table, we bring you handpicked delights, ensuring each bite is a burst of freshness. Elevate your snacking game with us – delivering joy in every box! 🍎🚀
          </p>

          <button className="hover:text-white text-orange-500 font-bold py-2 px-4 rounded-full cursor-pointer bg-transparent border border-orange-500 hover:bg-orange-500 hover:border-transparent transition-all ease-in-out duration-300">
            Order Now
          </button>
        </div>
        <div className="py-3 flex-1 flex items-center justify-end relative">
          <img
            className="absolute top-0 right-0 md:-right-12 w-full h-420 md:w-auto md:h-650"
            src={HeroBg}
            alt=""
          />
          <div className="w-full md:w-460 ml-0 flex flex-wrap items-center justify-center gap-4 gap-y-14">
            {randomData &&
              randomData.map((data, i) => (
                <div
                  key={i}
                  className="w-32 h-36 md:h-auto md:w-190 p-4 bg-lightOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg"
                >
                  <img
                    src={data.imageURL}
                    className="w-12 h-12 md:w-32 md:h-32 md:-mt-16 object-contain"
                    alt=""
                  />
                  <p className="text-sm lg:text-xl font-semibold text-textColor">
                    {data.product_name.slice(0, 14)}
                  </p>
                  <p className="text-[12px] text-center md:text-base text-lighttextGray font-semibold capitalize">
                    {data.product_category}
                  </p>
                  <p className="text-sm font-semibold text-headingColor">
                    <span className="text-xs text-red-600">$</span>{" "}
                    {data.product_price}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Home;
