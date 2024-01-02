import React from "react";
import { MdSearch, MdToggleOn , MdNotifications ,  MdPowerSettingsNew} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../assets/img/avatar.png";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setUserNull } from "../context/actions/userActions";
import { app } from "../config/firebase.config";

function Dbheader() {
  const user = useSelector((state) => state.user);
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const signOut = () =>{
 firebaseAuth.signOut().then(()=>{
  dispatch(setUserNull())
    navigate('/login' , {replace: true})
 }).catch((err) => console.log(err))
  }


  return (
    <div className="w-full flex items-center justify-between gap-3">
      <p className="text-2xl ">
        Welcome to City
        {user?.name && (
          <span className="block text-base text-gray-500">{`Hello ${user?.name}`}</span>
        )}
      </p>



      <div className="flex items-center justify-center gap-4">
  <div className="flex items-center justify-center gap-3 px-3 py-2 bg-white border rounded-full shadow-md">
    <MdSearch className="text-black text-2xl" />
    <input
      type="text"
      placeholder="Search here"
      className="border-none outline-none bg-transparent text-black text-base rounded-full"
    />
    <MdToggleOn className="text-black text-2xl" />
  </div>

  <div className="w-10 h-10 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center">
    <img
      className="w-full h-full object-cover rounded-full"
      src={user?.picture ? user?.picture : Avatar}
      referrerPolicy="no-referrer"
      alt="Avatar"
    />
  </div>

  <div className="flex items-center justify-center px-3 py-2 bg-white border rounded-full shadow-md">
    <MdNotifications className="text-black text-2xl" />
  </div>

  <div onClick={signOut} className="flex items-center justify-center px-3 py-2 bg-white border rounded-full shadow-md">
    <MdPowerSettingsNew className="text-black text-2xl" />
  </div>
</div>




    </div>
  );
}

export default Dbheader;
