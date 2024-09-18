const pool = require("../db");
const { verify } = require("jsonwebtoken");
const {
  createAccessToken,
  createRefreshToken,
  sendTokens,
} = require("../tokens");
const queries = require("../psqlQuerries/queries");

const refreshToken = async (req, res) => {
  const token = req.body.refreshToken;
  if (!token) {
    console.log("Server received no refresh token");
    return res.send({ accesstoken: "" });
  }

  // we have a token, verity it
  let payload = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    console.log("Token verified successfully");
  } catch (err) {
    console.log("Token verification failed:", err);
    return res.send({ accesstoken: "" });
  }

  // token is valid, check if user exists
  const userObject = await pool.query(queries.getUserById, [payload.userId]);
  const user = userObject.rows[0];
  if (!user) {
    console.log("User not found");
    return res.send({ accesstoken: "" });
  }
  // user exists, check if refresh token exists on user
  console.log(`${token === user.refresh_token}`);
  if (user.refresh_token !== token) {
    console.log("Refresh token does not match");
    return res.send({ accesstoken: "" });
  }
  // token exists, create new refresh and access token
  const accesstoken = createAccessToken(user.id);
  const refreshtoken = createRefreshToken(user.id);
  // update refreshtoken in db
  await pool.query(queries.updateRefreshToken, [refreshtoken, user.id]);

  // send new refresh token and access token
  sendTokens(res, accesstoken, refreshtoken, user.email);
};

module.exports = { refreshToken };
