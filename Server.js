/** @format */
// Require and configure dotenv to load environment variables from a .env file
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const userRouter = require("./Server/API/Users/user.router");
const app = express();

app.use(cors());
// { origin: "https://06541ee4.evangadiforum-frontend-4re.pages.dev" }
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up headers to allow cross-origin requests and custom headers
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
//   );
//   next();
// });
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://06541ee4.evangadiforum-frontend-4re.pages.dev"
  );
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
// 6. Mount the userRouter for handling /api/users routes
app.use("/api/users", userRouter);

const port = process.env.port || 8080;

app.listen(port, "0.0.0.0", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on port: ${port}`);
  }
});
