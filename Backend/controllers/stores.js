const pool = require("../db");
const queries = require("../psqlQuerries/queries");

const getSellerStoreQuerry = async () => {
  return await pool.query(queries.getSellersStore, [userEmail]);
};

const createStore = async (req, res) => {
  const { userEmail, storeName, storeDescription, storeEmail } = req.body;
  try {
    await pool.query(queries.createStore, [
      userEmail,
      storeName,
      storeDescription,
      storeEmail,
    ]);
    const sellersStore = await pool.query(queries.getSellersStore, [userEmail]);
    res.status(200).json({
      message: `Store: "${storeName}" created`,
      sellersStore: sellersStore.rows,
    });
  } catch (error) {
    console.error("Error creating store: ", error);
    res
      .status(500)
      .json({ error: "Internal Server Error during store creation" });
  }
};

const getSellerStore = async (req, res) => {
  const { userEmail } = req.query;
  try {
    const allUserStores = await pool.query(queries.getSellersStore, [
      userEmail,
    ]);
    res.status(200).json({ allUserStores: allUserStores.rows });
  } catch (error) {
    console.error("Error getting stores: ", error);
    res
      .status(500)
      .json({ error: "Internal Server Error during store retrieval" });
  }
};

const deleteStore = async (req, res) => {
  const { storeId } = req.query;
  try {
    await pool.query(queries.deleteStore, [storeId]);

    res.status(200).json({
      message: `Store with id: ${storeId} deleted`,
    });
  } catch (error) {
    console.error("Error deleting store: ", error);
    res
      .status(500)
      .json({ error: "Internal Server Error during store deletion" });
  }
};

module.exports = { createStore, getSellerStore, deleteStore };
