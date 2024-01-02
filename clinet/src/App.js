import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Dashboard, Login, Main } from "./containers";
import { app } from "./config/firebase.config";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./context/actions/userActions";
import { getAllCartItems, getAllProducts, validateUserJWtToken } from "./api";
import { setCartItems } from "./context/actions/cartAction";
import { Aboutus, CheakOutSucces,  Menu,  Service,  UsersOrder} from "./components";
import { setAllProducts } from "./context/actions/productAction";
import AboutusText from "./components/AboutusText";
import { MouseImage } from "./components/MouseImage";


function App() { 
  const firebaseAuth = getAuth(app);
  const [isloading, setisloading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setisloading(true);

    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateUserJWtToken(token)
            .then((data) => {
              if (data) {
                getAllCartItems(data.user_id).then((items) => {
                  console.log(items);
                  dispatch(setCartItems(items));
                });
                getAllProducts().then((items)=>{
                  dispatch(setAllProducts(items))
                })
              }

              dispatch(setUserDetails(data));
            })
            .finally(() => {
              setisloading(false); 
            });
        });
      } else {
        setisloading(false); 
      }
    });
  }, []);

  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      {isloading && (
        <div className="fixed z-50 inset-0 bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full">
          Loading...
        </div>
      )}

      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/cheakout-success/*" element={<CheakOutSucces />} />
        <Route path="/user-oder" element={<UsersOrder />} /> 
        <Route path="/aboutus" element={<AboutusText />} />  
        <Route path="/service" element={<Service/>} />     
        <Route path="/menu" element={<Menu/>} />     

         


        
      </Routes>
    </div>
  );
}

export default App;
