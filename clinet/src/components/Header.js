import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import Avatar from "../assets/img/avatar.png";

import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { app } from "../config/firebase.config";
import { setUserNull } from "../context/actions/userActions";
import { setCartOn } from "../context/actions/displayCartAction";
import { isActiveStyles, isNotActiveStyles } from "../utils/Style";

function Header() {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isMenu, setisMenu] = useState(false);
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();

  const signOut = () => {
    firebaseAuth
      .signOut()
      .then(() => {
        dispatch(setUserNull());
        navigate("/login", { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <header className="fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-12 md:px-20 py-6">
      <NavLink to={"/"} className={"flex items-center justify-center gap-4"}>
        <img src={logo} className="w-12" alt="Logo" />
        <p className="font-semibold text-xl hover:text-slate-900 text-slate-700 cursor-pointer bg-transparent">
        Bite Bliss
        </p>
      </NavLink>

      <nav className="flex items-center justify-center gap-8">
        <ul className="hidden md:flex items-center justify-center gap-16">
          <NavLink
            to={"/home"}
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/menu"}
          >
            Menu
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/service"}
          >
            Service
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? isActiveStyles : isNotActiveStyles
            }
            to={"/aboutus"}
          >
            About Us
          </NavLink>
        </ul>

        <div
          onClick={() => {
            dispatch(setCartOn());
          }}
          className="relative flex items-center justify-center"
        >
          <MdShoppingBasket className="text-textColor text-2xl cursor-pointer" />
          {cart?.length > 0 && (
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">{cart?.length}</p>
            </div>
          )}
        </div>

        {user ? (
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setisMenu(true)}
          >
            <div className="w-10 h-10 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center">
              <img
                className="w-full h-full object-cover"
                src={user?.picture ? user?.picture : Avatar}
                referrerPolicy="no-referrer"
                alt="Avatar"
              />
            </div>

            {isMenu && (
              <div
                onMouseLeave={() => setisMenu(false)}
                className="w-48 px-6 py-4 bg-lightOverlay backdrop-blur-md rounded-md shadow-md absolute top-12 right-0 flex flex-col gap-4"
              >
                {user?.user_id === "JAd5Xt3hJLMKGIwu6qFs1sY2cHv1" && (
                  <Link
                    className="hover:text-slate-900 text-slate-500 text-md"
                    to={"/dashboard/home"}
                  >
                    Dashboard
                  </Link>
                )}

                <Link
                  className="hover:text-slate-900 text-slate-500 text-md"
                  to={"/profile"}
                >
                  My Profile
                </Link>

                <Link
                  className="hover:text-slate-900 text-slate-500 text-md"
                  to={"/user-oder"}
                >
                  Orders
                </Link>
                <hr />
                <div
                  onClick={signOut}
                  className="group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap-3"
                >
                  <MdLogout className="text-2xl text-textColor group-hover:text-headingColor" />
                  <p className="text-textColor text-sm group-hover:text-headingColor">
                    Sign Out
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <NavLink to={"/login"}>
            <button className="bg-white border border-black text-black font-bold  hover:bg-black hover:text-white flex items-center justify-center px-2 py-1 rounded-full shadow-md">
              Login
            </button>
          </NavLink>
        )}
      </nav>
    </header>
  );
}

export default Header;
