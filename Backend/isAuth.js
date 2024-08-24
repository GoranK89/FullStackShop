const verifyToken = require("jsonwebtoken");

const isAuth = (req) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    throw new Error("Please log in to view this page");
  }
  const token = authorization.split(" ")[1];
  const { userId } = verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
  return userId;
};

module.exports = { isAuth };
