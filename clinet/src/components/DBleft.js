import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/img/logo.png";

function DBleft() {
  return (
    
    <div className="h-full py-12 flex-col bg-white backdrop-blur-md shadow-md min-w-210 w-300 gap-3">
      <NavLink
        to={"/"}
        className={"flex items-center justify-start px-6 py-6 pt-0 gap-4"}
      >
        <img src={logo} className="w-12" alt="Logo" />
        <p className="font-semibold text-xl hover:text-slate-900 text-slate-500 cursor-pointer bg-transparent">
          City
        </p>
      </NavLink>
      <hr />
      <ul className="flex flex-col gap-4 pt-4">
        <NavLink
          className="hover:text-slate-900 text-slate-500 font-semibold py-1 px-2 rounded ml-2 cursor-pointer bg-transparent"
          to={"/dashboard/home"}
        >
          Home
        </NavLink>
        <NavLink
          className="hover:text-slate-900 text-slate-500 font-semibold py-1 px-2 rounded ml-2 cursor-pointer bg-transparent"
          to={"/dashboard/oders"}
        >
          Oders
        </NavLink>
        <NavLink
          className="hover:text-slate-900 text-slate-500 font-semibold py-1 px-2 rounded ml-2 cursor-pointer bg-transparent"
          to={"/dashboard/items"}
        >
          Items
        </NavLink>
        <NavLink
          className="hover:text-slate-900 text-slate-500 font-semibold py-1 px-2 rounded ml-2 cursor-pointer bg-transparent"
          to={"/dashboard/new-items"}
        >
          Add New Items
        </NavLink>
        <NavLink
          className="hover:text-slate-900 text-slate-500 font-semibold py-1 px-2 rounded ml-2 cursor-pointer bg-transparent"
          to={"/dashboard/users"}
        >
          Users
        </NavLink>
      </ul>
      <div className="mb-12"></div>
      <div className="mb-12"></div>
      <div className="mb-12"></div>
      <div className="mb-15"></div>

      <div className=" rounded-full  items-center justify-center flex h-300 mt-auto px-2">
        <div className="   w-full h-full rounded-2xl bg-black flex items-center justify-center flex-col gap-3 px-3 text-white">
          <div className="w-12 h-12 border bg-white rounded-full flex items-center justify-center">
            <p className="text-2xl font-bold text-black">?</p>
          </div>
          <p className="text-xl font-semibold">Help Center</p>
          <p className="text-base text-gray-300 text-center">
            Having trouble in city. Please contact us for more questions
          </p>
          <p className="px-4 py-2 rounded-full bg-white text-black cursor-pointer">
            Get in touch
          </p>
        </div>
      </div>
      
    </div>
    

    
    
    
  );
}

export default DBleft;
