const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv").config();
const morgan = require("morgan");
const serviceAccountKey = require("./serviceAccountKey.json");

const express = require("express");
const app = express();

// body parser for our JSON data
app.use(express.json());
app.use(morgan("dev"));
// Enable CORS
// const cors = require("cors");
// app.use(cors({origin: true}));
// app.use((req, res, next) => {
//   res.set("Access-Control-Allow-Origin", "*");
//   next();
// });
const cors = require("cors");
app.use(cors({origin: true}));


// Firebase credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

// API endpoints
app.get("/", (req, res) => {
  return res.send("Hello Joel");
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Import and use the userRoute
const userRoute = require("./routes/user");
app.use("/api/users", userRoute);

// Import and use the productRoute
const productRoute = require("./routes/products");
app.use("/api/products", productRoute);

exports.app = functions.https.onRequest(app);
