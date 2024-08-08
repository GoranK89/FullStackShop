const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";
const register = "INSERT INTO users (email, password) VALUES ($1, $2)";
const getUserByEmail = "SELECT * FROM users WHERE email = $1";

module.exports = { getUsers, getUserById, register, getUserByEmail };
