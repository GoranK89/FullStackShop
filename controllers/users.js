const pool = require("../db");
const bcrypt = require("bcrypt");
const queries = require("../src/fss/queries");

const getUsers = (req, res) => {
  pool.query(queries.getUsers, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results.rows);
  });
};

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

module.exports = { getUsers, register };
