/** @format */

const { json } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  auth: (req, res, next) => {
    try {
      const token = req.header("x-auth-token");
      if (!token)
        return res
          .status(401)
          .json({ msg: "no authentication token, authorization denied" });
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      console.log(verified);
      if (!verified)
        return res
          .status(401)
          .json({ msg: "Token verification failed, authorization denied" });
      req.id = verified.id;
      next();
    } catch (err) {
      res.status(500).json({ error: err.msg });
    }
  },
  authenticateToken(req, res, next) {
    // console.log(res);
    const token = req.header("x-auth-token");
    if (!token) return res.sendStatus(401);
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      console.log(user);
      req.user = user.id;
      next();
    });
  },
};
