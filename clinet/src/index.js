import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createStore } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import {  Provider} from "react-redux";
import myReducers from "./context/reducers";
import ErrorBoundary from "./components/ErrorBoundary";


const Mystore = createStore(myReducers)
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <Provider store={Mystore}>
      <ErrorBoundary>
      <App />
      </ErrorBoundary>
      </Provider>
      
    </Router>
  </React.StrictMode>
);
