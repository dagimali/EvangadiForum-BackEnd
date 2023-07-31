/** @format */
// Require and configure dotenv to load environment variables from a .env file
require("dotenv").config();

// Require necessary modules
const express = require("express");
const cors = require("cors");
const userRouter = require("./Server/API/Users/user.router");

// Create an Express application instance
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming requests with JSON payloads
app.use(express.json());

// Parse incoming requests with URL-encoded payloads
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

// Mount the userRouter for handling /api/users routes
app.use("/api/users", userRouter);

// Set the port for the server to listen on (either from environment variable or default to 8080)
const port = process.env.PORT || 8080;

// Start the server and listen on the specified port
app.listen(port, "0.0.0.0", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on port: ${port}`);
  }
});
