import React from "react";
import DataTable from "../components/DataTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProducts, getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productAction";

function DBitems() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  return (
    <div className="items-center justify-self-center gap-4 pt-6 w-full">
      <DataTable
        title="List of Product Data"
        columns={[
          {
            title: "Image",
            field: "imageURL",
            render: (rowData) => (
              <img
                src={rowData.imageURL}
                className="w-12 h-16 object-contain rounded-md"
                alt="Product"
              />
            ),
          },
          {
            title: "Name",
            field: "product_name",
          },
          {
            title: "Category",
            field: "product_category",
          },
          {
            title: "Price",
            field: "product_price",
            render: (rowData) => (
              <p className="text-xl font-semibold text-textColor flex items-center ">
                ₹{parseFloat(rowData.product_price).toFixed(2)}
              </p>
            ),
          },
        ]}
        data={products}
        actions={[
          {
            icon: "z",
            tooltip: "Edit Data",
            onClick: (event, rowData) => {
              alert(" You want to edit" + rowData.productId);
            },
          },
          {
            icon: "delete",
            tooltip: "Delete Data",
            onClick: (event, rowData) => {
              console.log("Row data:", rowData);
              if (window.confirm("are u sure?")) {
                deleteAProducts(rowData.productId).then((res) => {
                  alert("Product deleted successfully");
                  getAllProducts().then((data) => {
                    dispatch(setAllProducts(data));
                  });
                });
              }
            },
          },
        ]}
      />
    </div>
  );
}

export default DBitems;
