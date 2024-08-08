const pool = require("../db");
const bcrypt = require("bcrypt");
const queries = require("../src/fss/queries");

// REGISTRATION controller
const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(queries.register, [email, hashedPassword]);

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

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in user: ", error);
    res.status(500).json({ error: "Internal Server Error during login" });
  }
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

module.exports = { getUsers, register, login };
