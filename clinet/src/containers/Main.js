import React, { useEffect } from "react";
import { Cart, FilterSection, Header, Home, HomeSlider } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productAction";


const Main = () => {
  const products = useSelector((state) => state.products);
  const isCart = useSelector((state) => state.isCart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        console.log(data); 
        dispatch(setAllProducts(data));
        console.log(products);
      });
    }
  }, [products, dispatch]);
  return (
    <main className="w-screen flex flex-col items-center justify-start">
      <Header />
      <div className="w-full flex flex-col items-start justify-center mt-40 px-6 2xl:px-96 gap-12 pb-24">
        <Home />
        <HomeSlider />
        <FilterSection />
      </div>

      {isCart && <Cart />}
    </main>
  );
}

export default Main;
