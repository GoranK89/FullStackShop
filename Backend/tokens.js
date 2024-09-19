const jwt = require("jsonwebtoken");

const createAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const createRefreshToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

// for now sendAccessToken and sendRefreshToken are obsolete
const sendAccessToken = (res, req, accessToken) => {
  res.send({
    accessToken,
    email: req.body.email,
  });
};

const sendRefreshToken = (res, refreshtoken) => {
  // for some reason frontend does not send the cookie to the backend
  res.cookie("refresh", refreshtoken, {
    httpOnly: true,
    sameSite: "None",
    secure: false,
    path: "/refresh",
  });
};

// this one will be used instead
const sendTokens = (res, accessToken, refreshToken, email, userType) => {
  res.send({
    accessToken,
    refreshToken,
    email,
    userType,
  });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
  sendTokens,
};
