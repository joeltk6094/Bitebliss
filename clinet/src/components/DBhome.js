import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productAction";

import { CChart } from "@coreui/react-chartjs";

const DBhome = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const Drinks = products?.filter((item) => item.product_category === "Drinks");
  const Deserts = products?.filter(
    (item) => item.product_category === "Deserts"
  );
  const Fruits = products?.filter((item) => item.product_category === "Fruits");
  const Rice = products?.filter((item) => item.product_category === "Rice");
  const Curry = products?.filter((item) => item.product_category === "Curry");
  const Chinese = products?.filter(
    (item) => item.product_category === "Chinese"
  );
  const Bread = products?.filter((item) => item.product_category === "Bread");

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        console.log('Fetched updated products:', data);
        dispatch(setAllProducts(data));
      });
    }
  }, [products]);

  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full h-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div className="flex items-center justify-center">
          <div className="w-340 md:w-508">
            <CChart
              type="bar"
              data={{
                labels: [
                  "Drinks",
                  "Deserts",
                  "Fruits",
                  "Rice",
                  "Curry",
                  "Chinese",
                  "Bread",
                ],
                datasets: [
                  {
                    label: "Category wise count",
                    backgroundColor: "#f87979",
                    data: [
                      Drinks?.length,
                      Deserts?.length,
                      Fruits?.length,
                      Rice?.length,
                      Curry?.length,
                      Chinese?.length,
                      Bread?.length,
                    ],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: "--cui-body-color", // Removed unnecessary parentheses
                    },
                  },
                },
                scales: {
                  x: {
                    grid: {
                      color: "--cui-border-color-translucent", // Removed unnecessary parentheses
                    },
                    ticks: {
                      color: "--cui-body-color", // Removed unnecessary parentheses
                    },
                  },
                  y: {
                    grid: {
                      color: "--cui-border-color-translucent", // Removed unnecessary parentheses
                    },
                    ticks: {
                      color: "--cui-body-color", // Removed unnecessary parentheses
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-275 md:w-460">
            <CChart
              type="doughnut"
              data={{
                labels: ["Orders", "Deliverd", "Cancelled", "Paid", "Not Paid"],
                datasets: [
                  {
                    backgroundColor: [
                      "#41B883",
                      "#E46651",
                      "#00D8FF",
                      "#DD1B16",
                    ],
                    data: [40, 20, 80, 10, 34, 54],
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: "--cui-body-color",
                    },
                  },
                },
              }}
            />

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBhome;
