import React, { useEffect, useState } from 'react';
import LoginInput from '../components/LoginInput';
import {getAuth, signInWithPopup , GoogleAuthProvider, createUserWithEmailAndPassword , signInWithEmailAndPassword} from 'firebase/auth'
import {app} from '../config/firebase.config'
import { validateUserJWtToken } from '../api';
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { setUserDetails } from '../context/actions/userActions';


function Login() {
  const [userEmail, setuserEmail] = useState('');
  const [isSiginUp, setisSiginUp] = useState(false);
  const [password, setpassword] = useState('');
  const [confirm_password, setconfirm_password] = useState('');

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const user = useSelector(state => state.user);

  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user]);


  const loginwithgoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWtToken(token).then((data) => {
              dispatch(setUserDetails(data));
              navigate('/',{replace: true})
            });
          });
        }
      });
    });
  };

  const signUpWithEmailPassword = async() => {
    if (userEmail === "" || password === "" || confirm_password === "") {
      
    } else{

      if(password === confirm_password){
        setuserEmail("")
        setconfirm_password("")
        setpassword("")
        await createUserWithEmailAndPassword (firebaseAuth, userEmail ,password).then(userCred =>{
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWtToken(token).then((data) => {
                  dispatch(setUserDetails(data));

                });
                navigate('/',{replace: true})
              });
            }
          });
          
        })
      } else{
        //alert msg
      }
    }
  };
  const signInWithEmailPass = async () => {
    if (userEmail !== "" && password !== "") {
      try {
        const userCred = await signInWithEmailAndPassword(firebaseAuth, userEmail, password);
        firebaseAuth.onAuthStateChanged((cred) => {
          if (cred) {
            cred.getIdToken().then((token) => {
              validateUserJWtToken(token).then((data) => {
                dispatch(setUserDetails(data));
                navigate('/',{replace: true})
              });
            });
          }
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      // e.g., show an alert message
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">{isSiginUp ? "Sign-Up" : "Sign-in"} with these</h1>
      <LoginInput
        placeHolder={"Email Here"}
        inputState={userEmail}
        inputStatefunc={setuserEmail}
        type="email"
        isSignUp={isSiginUp}
      />
      <div className="mb-5"></div>
      <LoginInput
        placeHolder={"Password Here"}
        inputState={password}
        inputStatefunc={setpassword}
        type="password"
        isSignUp={isSiginUp}
      />
      {isSiginUp && (
        <>
          <div className="mb-5"></div>
          <LoginInput
            placeHolder={"Confirm Password Here"}
            inputState={confirm_password}
            inputStatefunc={setconfirm_password}
            type="password"
            isSignUp={isSiginUp}
          />
        </>
      )}
      
      {/* buttons */}

      {isSiginUp  ? <div className="mt-5 flex">
        <button onClick={signUpWithEmailPassword}  className=" w-full capitalize bg-white border border-black text-black font-bold py-2 px-4 rounded-full hover:bg-black hover:text-white transition duration-300">
          
          Sign-Up
        </button>
      </div> : <div className="mt-5 flex">
        <button  onClick={signInWithEmailPass}  className=" w-full capitalize bg-white border border-black text-black font-bold py-2 px-4 rounded-full hover:bg-black hover:text-white transition duration-300">
          Sign-In
        </button>
      </div> }


      {!isSiginUp ? (
        <p className="mt-5 flex items-center justify-center">
          <span className="text-sm text-gray-500">Doesn't have an account</span>
          <button
            className="hover:text-slate-900 text-slate-500 font-bold py-1 px-2 rounded ml-2 cursor-pointer bg-transparent"
            onClick={() => setisSiginUp(true)}
          >
            Create One
          </button>
        </p>
      ) : (
        <p className="mt-5 flex items-center justify-center">
          <span className="text-sm text-gray-500">Already have an account</span>
          <button
            className="hover:text-slate-900 text-slate-500 font-bold py-1 px-2 rounded ml-2 cursor-pointer bg-transparent"
            onClick={() => setisSiginUp(false)}
          >
            Sign-in Here
          </button>
        </p>
      )}


<div className="flex items-center justify-center mt-5">
  <hr className="w-20 border border-gray" />
  <span className="mx-2 text-gray-500">or</span>
  <hr className="w-20 border border-gray" />
</div>
<div className="mb-3"></div>

<button onClick={loginwithgoogle}
className="bg-white border border-black text-black font-bold py-2 px-4 rounded-full hover:bg-black hover:text-white flex items-center justify-center">
  <img
    src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
    alt="Google Logo"
    width="24"
    height="24"
    className="mr-2"
  />
  <span>Sign in with Google</span>
  
</button>


    </div>
  );
}

export default Login;
