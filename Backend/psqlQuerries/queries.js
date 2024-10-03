// USERS - table name in the database: users
const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";
const register =
  "INSERT INTO users (email, password, user_type) VALUES ($1, $2, $3)";
const getUserByEmail = "SELECT * FROM users WHERE email = $1";
const updateRefreshToken = "UPDATE users SET refresh_token = $1 WHERE id = $2";

// STORES - table name in the database: stores
const createStore =
  "INSERT INTO stores (user_email, store_name, store_description, store_email) VALUES ($1, $2, $3, $4)";
const getAllUserStores = "SELECT * FROM stores WHERE user_email = $1";
const deleteStore = "DELETE FROM stores WHERE id = $1";

// PRODUCTS - table name in the database: products
const addProductWithoutStoreId =
  "INSERT INTO products (user_email, product_name, product_description, product_price, product_stock) VALUES ($1, $2, $3, $4, $5)";
const addProductWithStoreId =
  "INSERT INTO products (user_email, product_name, product_description, product_price, product_stock, store_ids) VALUES ($1, $2, $3, $4, $5, $6::INTEGER[])";
const getAllUserProducts = "SELECT * FROM products WHERE user_email = $1";
const deleteProduct = "DELETE FROM products WHERE id = $1";

module.exports = {
  getUsers,
  getUserById,
  register,
  getUserByEmail,
  updateRefreshToken,
  createStore,
  getAllUserStores,
  deleteStore,
  addProductWithoutStoreId,
  addProductWithStoreId,
  getAllUserProducts,
  deleteProduct,
};
