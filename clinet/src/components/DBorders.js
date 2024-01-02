import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../api";
import { setOrders } from "../context/actions/orderActions";
import OrderData from "./OrderData";

const DBorders = () => {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  // Pagination state
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1); // Start from page 1

  useEffect(() => {
    if (!orders) {
      getAllOrder().then((data) => {
        dispatch(setOrders(data));
      });
    }
  }, [dispatch, orders]);

  // Update the total pages calculation
  const totalPages = orders ? Math.ceil(orders.length / itemsPerPage) : 0;

  // Change page
  const setPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col pt-6 w-full gap-4">
      {orders ? (
        <>
          {orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((item, i) => (
            <OrderData key={i} index={i} data={item} admin={true} />
          ))}
          {/* Pagination controls */}
          <div className="flex justify-center mt-4">
            <button onClick={() => setPage(currentPage - 1)} className="px-3 py-1 mx-1 rounded bg-gray-200 text-gray-800" disabled={currentPage === 1}>
              -
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
              <button
                key={number}
                onClick={() => setPage(number)}
                className={`px-3 py-1 mx-1 rounded ${
                  number === currentPage ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                {number}
              </button>
            ))}
            <button onClick={() => setPage(currentPage + 1)} className="px-3 py-1 mx-1 rounded bg-gray-200 text-gray-800" disabled={currentPage === totalPages}>
              +
            </button>
          </div>
        </>
      ) : (
        <h1 className="text-[72px] text-headingColor font-bold">No data</h1>
      )}
    </div>
  );
};

export default DBorders;
