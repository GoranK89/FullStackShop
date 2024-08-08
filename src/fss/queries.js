const getUsers = "SELECT * FROM users";
const getUserById = "SELECT * FROM users WHERE id = $1";
const register = "INSERT INTO users (email, password) VALUES ($1, $2)";

module.exports = { getUsers, getUserById, register };
