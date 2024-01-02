import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../api";
import { setOrders } from "../context/actions/orderActions";
import OrderData from "./OrderData";

const UsersOrder = () => {
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const [userOders, setuserOders] = useState(null);

  useEffect(() => {
    if (!orders) {
      getAllOrder().then((data) => {
        dispatch(setOrders(data));
        setuserOders(data.filter((item) => item.userId === user?.user_id));
      });
    } else {
      setuserOders(orders.filter((data) => data.userId === user?.user_id));
    }
  }, [orders, dispatch, user]);

  return (
    <main className="w-screen flex flex-col items-center justify-start">
      <Header />
      <div className="w-full flex flex-col items-start justify-center mt-40 px-6 2xl:px-96 gap-12 pb-24">
        {userOders && userOders?.length > 0 ? (
          userOders.map((item, i) => (
            <OrderData key={i} index={i} data={item} admin={false} />
          ))
        ) : (
          <h1 className="text-[72px] text-headingColor font-bold">No data</h1>
        )}
      </div>
    </main>
  );
};

export default UsersOrder;
