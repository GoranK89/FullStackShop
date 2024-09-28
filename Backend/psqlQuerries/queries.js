// USERS - table name in the database: users
const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";
const register =
  "INSERT INTO users (email, password, user_type) VALUES ($1, $2, $3)";
const getUserByEmail = "SELECT * FROM users WHERE email = $1";
const updateRefreshToken = "UPDATE users SET refresh_token = $1 WHERE id = $2";

// STORES
const createStore =
  "INSERT INTO stores (user_email, store_name, store_description, store_email) VALUES ($1, $2, $3, $4)";
const getAllUserStores = "SELECT * FROM stores WHERE user_email = $1";
const deleteStore = "DELETE FROM stores WHERE id = $1";
module.exports = {
  getUsers,
  getUserById,
  register,
  getUserByEmail,
  updateRefreshToken,
  createStore,
  getAllUserStores,
  deleteStore,
};
