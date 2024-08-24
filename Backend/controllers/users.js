const pool = require("../db");
const bcrypt = require("bcrypt");
const queries = require("../psqlQuerries/queries");
const {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require("../tokens");

// REGISTRATION controller
const register = async (req, res) => {
  const { email, password, userType } = req.body;
  try {
    // TODO: Check if email already exists

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(queries.register, [email, hashedPassword, userType]);

    res.status(200).json({ message: `Email ${email} registered` });
  } catch (error) {
    console.error("Error registering user: ", error);
    res
      .status(500)
      .json({ error: "Internal Server Error during registration" });
  }
};

// LOGIN controller
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(queries.getUserByEmail, [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Check if password is matching
    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    //Create Refresh and Access tokens
    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshToken(user.id);
    await pool.query(queries.updateRefreshToken, [refreshToken, user.id]);

    // Send tokens, refresh as cookie and access as response
    sendRefreshToken(res, refreshToken);
    sendAccessToken(res, req, accessToken);
  } catch (err) {
    res.send({ error: `${err.message}` });
  }
};

// LOGOUT controller
const logout = async (_req, res) => {
  res.clearCookie("refreshtoken", { path: "/refresh_token" });
  return res.send({ message: "Logged out" });
};

// Get all users
const getUsers = (req, res) => {
  pool.query(queries.getUsers, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

module.exports = { getUsers, register, login, logout };
