const pool = require("../db");
const queries = require("../psqlQuerries/queries");

const addProduct = async (req, res) => {
  const {
    productName,
    productDescription,
    productPrice,
    productStock,
    storeId,
  } = req.body;

  let query;
  let values;

  if (storeId) {
    query = queries.addProductWithStoreId;
    values = [
      productName,
      productDescription,
      productPrice,
      productStock,
      storeId,
    ];
  } else {
    query = queries.addProductWithoutStoreId;
    values = [productName, productDescription, productPrice, productStock];
  }

  try {
    await pool.query(query, values);
    res.status(200).json({ message: `Product: "${productName}" added` });
  } catch (error) {
    console.error("Error adding product: ", error);
    res
      .status(500)
      .json({ error: "Internal Server Error during product addition" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query(queries.getAllProducts);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting products: ", error);
    res
      .status(500)
      .json({ error: "Internal Server Error during getting products" });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.query;
  try {
    await pool.query(queries.deleteProduct, [productId]);
    res.status(200).json({ message: `Product with id: ${productId} deleted` });
  } catch (error) {
    console.error("Error deleting product: ", error);
    res
      .status(500)
      .json({ error: "Internal Server Error during product deletion" });
  }
};

module.exports = { addProduct, getAllProducts, deleteProduct };
