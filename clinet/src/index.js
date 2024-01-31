import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createStore } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import myReducers from "./context/reducers";
import ErrorBoundary from "./components/ErrorBoundary";

const Mystore = createStore(myReducers);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Router>
    <Provider store={Mystore}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </Router>
);

const data = {
  apiKey: "AIzaSyDSuKUK-OhV8lbZzQE2hpHQye6W3yYp_QQ",
  authDomain: "cockie-44bc1.firebaseapp.com",
  databaseURL: "https://cockie-44bc1-default-rtdb.firebaseio.com",
  projectId: "cockie-44bc1",
  storageBucket: "cockie-44bc1.appspot.com",
  messagingSenderId: "754838479534",
  appId: "1:754838479534:web:5a1ea6ba4746b27f09833f",
  measurementId: "G-B6340EF5BS",
};
