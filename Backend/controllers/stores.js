const pool = require("../db");
const queries = require("../psqlQuerries/queries");

const createStore = async (req, res) => {
  const { userEmail, storeName, storeDescription, storeEmail } = req.body;
  try {
    await pool.query(queries.createStore, [
      userEmail,
      storeName,
      storeDescription,
      storeEmail,
    ]);
    res.status(200).json({ message: `Store: "${storeName}" created` });
  } catch (error) {
    console.error("Error creating store: ", error);
    res
      .status(500)
      .json({ error: "Internal Server Error during store creation" });
  }
};

const getAllUserStores = async (req, res) => {
  const { userEmail } = req.query;
  try {
    const result = await pool.query(queries.getAllUserStores, [userEmail]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting user stores: ", error);
    res
      .status(500)
      .json({ error: "Internal Server Error during getting user stores" });
  }
};

const deleteStore = async (req, res) => {
  const { storeId } = req.query;
  try {
    await pool.query(queries.deleteStore, [storeId]);
    res.status(200).json({ message: `Store with id: ${storeId} deleted` });
  } catch (error) {
    console.error("Error deleting store: ", error);
    res
      .status(500)
      .json({ error: "Internal Server Error during store deletion" });
  }
};

module.exports = { createStore, getAllUserStores, deleteStore };
