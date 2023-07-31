/** @format */
require("dotenv").config();
// const mysql = require("mysql2");
// const pool = require("./Server/Config/database");
const express = require("express");
const cors = require("cors");
// const mysql = require("mysql2");
const app = express();
const port = process.env.port || 80;
const userRouter = require("./Server/API/Users/user.router");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/users", userRouter);

app.listen(port, "0,0,0,0", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`server listening to port:${port}`);
  }
});
