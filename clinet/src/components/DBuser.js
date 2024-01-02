// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllUsers } from "../api";
// import { setAllUserDetails } from "../context/actions/allUserActions";
// import { Avatar } from "@mui/material";
// import DataTable from "../components/DataTable";

// const DBUsers = () => {
//   const allUsers = useSelector((state) => state.allUsers);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!allUsers) {
//       getAllUsers().then((data) => {
//         dispatch(setAllUserDetails(data));
//       });
//     }
//   }, [allUsers, dispatch]);

//   return (
//     <div className="items-center justify-self-center gap-4 pt-6 w-full">
//       <DataTable
//         title="List of Users"
//         columns={[
//           {
//             title: "Image",
//             field: "photoURL",
//             render: (rowData) => (
//               <img
//                 src={rowData.photoURL ? rowData.photoURL : Avatar}
//                 className="w-12 h-16 object-contain rounded-md"
//                 alt="Product"
//               />
//             ),
//           },
//           {
//             title: "Name",
//             field: "displayName",
//           },
//           {
//             title: "Email",
//             field: "email",
//           },
//           {
//             title: "Verified",
//             field: "email",
//             render: (rowData) => (
//               <p
//                 className={`px-2 py-1 text-center text-primary rounded-md ${
//                   rowData.emailVerified ? "bg-emerald-500" : "bg-red-500"
//                 }`}
//               >
//                 {rowData.emailVerified ? "Verified" : "Not verified"}
//               </p>
//             ),
//           },
//         ]}
//         data={allUsers}
//         // actions={[
//         //   {
//         //     icon: "edit",
//         //     tooltip: "Edit Data",
//         //     onClick: (event, rowData) => {
//         //       alert(" You want to edit" + rowData.productId);
//         //     },
//         //   },
//         //   {
//         //     icon: "delete",
//         //     tooltip: "Delete Data",
//         //     onClick: (event, rowData) => {
//         //       console.log("Row data:", rowData);
//         //       if (window.confirm("are u sure?")) {
//         //         deleteAProducts(rowData.productId).then((res) => {
//         //           alert("Product deleted successfully");
//         //           getAllProducts().then((data) => {
//         //             dispatch(setAllProducts(data));
//         //           });
//         //         });
//         //       }
//         //     },
//         //   },
//         // ]}
//       />
//     </div>
//   );
// };

// export default DBUsers;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../api";
import { setAllUserDetails } from "../context/actions/allUserActions";
import Avatar from "../assets/img/avatar.png";
import DataTable from "../components/DataTable";

const DBUsers = () => {
  const allUsers = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        dispatch(setAllUserDetails(data));
      });
    }
  }, [allUsers, dispatch]);

  return (
    <div className="items-center justify-self-center gap-4 pt-6 w-full">
      {allUsers && allUsers.length > 0 ? (
        <DataTable
          title="List of Users"
          columns={[
            {
              title: "Image",
              field: "photoURL",
              render: (rowData) => (
                <img
                  src={rowData.photoURL ? rowData.photoURL : Avatar}
                  className="w-12 h-16 object-contain rounded-md"
                  alt="Product"
                />
              ),
            },
            {
              title: "Name",
              field: "displayName",
            },
            {
              title: "Email",
              field: "email",
            },
            {
              title: "Verified",
              field: "email",
              render: (rowData) => (
                <p
                  className={`px-2 py-1 text-center text-primary rounded-md ${
                    rowData.emailVerified ? "bg-emerald-500" : "bg-red-500"
                  }`}
                >
                  {rowData.emailVerified ? "Verified" : "Not verified"}
                </p>
              ),
            },
          ]}
          data={allUsers}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DBUsers;
