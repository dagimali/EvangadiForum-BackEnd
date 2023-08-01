/** @format */

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const userRouter = require("./Server/API/Users/user.router");

const app = express();

// 1. Load environment variables with dotenv
app.use(cors({ origin: "*" }));

// 2. Enable CORS with the cors middleware
app.use(express.json());

// 3. Parse incoming JSON payloads
app.use(express.urlencoded({ extended: true }));

// 4. Parse incoming URL-encoded payloads

// 5. Set up custom CORS headers middleware
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://16bf9250.evangadiforum-frontend-4re.pages.dev",
    // Add other allowed origins here if needed
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS, POST, PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});

// 6. Mount the userRouter for handling /api/users routes
app.use("/api/users", userRouter);

const port = process.env.PORT || 8080;

app.listen(port, "0.0.0.0", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server listening on port: ${port}`);
  }
});
