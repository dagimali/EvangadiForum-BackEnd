/** @format */
require("dotenv").config();
// const mysql = require("mysql2");
// const pool = require("./Server/Config/database");
const express = require("express");
const cors = require("cors");
// const mysql = require("mysql2");
const app = express();
const port = process.env.port || 8080;
const userRouter = require("./Server/API/Users/user.router");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

app.use("/api/users", userRouter);

app.listen(port, "0.0.0.0", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server listening to port:${port}`);
  }
});
