const pool = require("../db");
const { verify } = require("jsonwebtoken");
const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} = require("../tokens");
const queries = require("../psqlQuerries/queries");

const refreshToken = async (req, res) => {
  const token = req.cookies.refreshtoken;
  // if there is no token in the request
  if (!token) return res.send({ accesstoken: "" });

  // we have a token, verity it
  let payload = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.send({ accesstoken: "" });
  }
  // token is valid, check if user exists
  const user = await pool.query(queries.getUserById, [payload.id]);
  if (!user) return res.send({ accesstoken: "" });
  // user exists, check if refresh token exists on user
  if (user.refreshtoken !== token) {
    return res.send({ accesstoken: "" });
  }
  // token exists, create new refresh and access token
  const accesstoken = createAccessToken(user.id);
  const refreshtoken = createRefreshToken(user.id);
  // update refreshtoken in db
  await pool.query(queries.updateRefreshToken, [refreshtoken, user.id]);

  // send new refresh token and access token
  sendRefreshToken(res, refreshtoken);
  return res.send({ accesstoken });
};

module.exports = { refreshToken };
