import React, { useState } from "react";
import Alert from "@mui/material/Alert";
import { FaCloudUploadAlt, FaSpinner, FaTrash } from "react-icons/fa";
import {
  uploadBytesResumable,
  getDownloadURL,
  ref,
  deleteObject,
} from "firebase/storage";
import { storage } from "../config/firebase.config";
import { useDispatch } from "react-redux";
import { addNewProduct, getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productAction";
import { statuses } from "../utils/Style";

const InputValueField = ({ type, placeHolder, stateValue, stateFunc }) => {
  return (
    <input
      type={type}
      placeholder={placeHolder}
      value={stateValue}
      onChange={(e) => stateFunc(e.target.value)}
      className="h-10 w-full px-3 bg-white text-black shadow-md outline-none rounded-md border border-gray-200 focus:border-black"
    />
  );
};

const DBnewitem = () => {
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageDownloadURL, setImageDownloadURL] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");
  const dispatch = useDispatch();

  const handleAlertSuccess = (message) => {
    setAlertMessage(message);
    setAlertSeverity("success");
  };

  const handleAlertError = (message) => {
    setAlertMessage(message);
    setAlertSeverity("error"); 
  };

  const submitNewData = () => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    
    const date = {
      productId: id,
      product_name: itemName,
      product_category: category,
      product_price: price,
      imageURL: imageDownloadURL,
    };

    console.log("Submitting new data:", date);
    addNewProduct(date).then((res) => {
      console.log(res);
      handleAlertSuccess("New Item added"); 
      setImageDownloadURL(null);
      setItemName("");
      setPrice("");
      setCategory(null);
    });
    getAllProducts().then((data) => {
      dispatch(setAllProducts(data));
    });
  };

  const handleUploadImage = async (e) => {
    setIsLoading(true);
    try {
      const imageFile = e.target.files[0];
      const storageRef = ref(
        storage,
        `images/${Date.now()}_${imageFile.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          handleAlertError(`Error uploading image: ${error.message}`);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageDownloadURL(downloadURL);
            setIsLoading(false);
            setProgress(100);
            handleAlertSuccess("Image uploaded successfully");
          });
        }
      );
    } catch (error) {
      handleAlertError(`Error uploading image: ${error.message}`);
    }
  };

  const handleDeleteImage = async () => {
    setIsLoading(true);
    try {
      await deleteObject(ref(storage, imageDownloadURL));
      setImageDownloadURL(null);
      setIsLoading(false);
      handleAlertSuccess("Image removed successfully");
    } catch (error) {
      handleAlertError(`Error deleting image: ${error.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col pt-6 px-24 w-full">
      <div className="border border-gray-300 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4 text-black">
        <InputValueField
          type="text"
          placeHolder="Item Name Here"
          stateFunc={setItemName}
          stateValue={itemName}
        />

        <div className="w-full flex items-center justify-around gap-3 flex-wrap">
          {statuses &&
            statuses.map((data) => (
              <p
                key={data.id}
                onClick={() => setCategory(data.category)}
                className={`px-3 py-3 rounded-2xl text-xl font-semibold cursor-pointer 
                  transition duration-300 border-gray-200 backdrop-blur-md hover:shadow-md
                  ${
                    data.category === category ? "text-black" : "text-gray-400"
                  }`}
              >
                {data.title}
              </p>
            ))}
        </div>

        <InputValueField
          type="number"
          placeHolder="Item Price Here"
          stateFunc={setPrice}
          stateValue={price}
        />
        {alertMessage && <Alert severity={alertSeverity}>{alertMessage}</Alert>}

        <div className="w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer relative">
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-evenly px-24">
              <FaSpinner />
              <div>{Math.round(progress)}% uploaded</div>
            </div>
          ) : (
            <>
              {!imageDownloadURL ? (
                <>
                  <label>
                    <div className="flex flex-col items-center justify-center h-full w-full cursor-pointer bg-white rounded-lg p-6 shadow-md">
                      <p className="font-bold text-4xl text-black">
                        <FaCloudUploadAlt />
                      </p>
                      <p className="text-lg text-textColor">Click to Upload</p>
                    </div>
                    <input
                      type="file"
                      name="upload-image"
                      accept="image/*"
                      onChange={handleUploadImage}
                      className="w-0 h-0"
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <img
                      className="w-full h-full object-cover"
                      src={imageDownloadURL}
                      alt="Uploaded Item"
                    />
                    <button
                      type="button"
                      className="absolute top-3 right-3 p-3 rounded-full bg-red-500 text-white duration-500 transition-all ease-in-out"
                      onClick={handleDeleteImage}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <button
          onClick={submitNewData}
          
          className="w-9/12 py-2 rounded-md border border-black text-black hover:bg-black hover:text-white cursor-pointer"
        >
          
          Save
        </button>
      </div>
    </div>
  );
};



export default DBnewitem;
