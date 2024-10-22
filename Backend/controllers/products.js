const pool = require("../db");
const queries = require("../psqlQuerries/queries");

const addProduct = async (req, res) => {
  const { userEmail } = req.query;

  const { productName, productDescription, productPrice, productStock } =
    req.body;

  try {
    // store products in DB
    await pool.query(queries.addProduct, [
      userEmail,
      productName,
      productDescription,
      productPrice,
      productStock,
    ]);
    // get all user products
    const allSellerProducts = await pool.query(queries.getAllSellerProducts, [
      userEmail,
    ]);
    // send back message and all user products
    res.status(200).json({
      message: `Product: "${productName}" added`,
      allSellerProducts: allSellerProducts.rows,
    });
  } catch (error) {
    console.error("Error adding product: ", error);
    res
      .status(500)
      .json({ error: "Internal Server Error during product addition" });
  }
};

const getAllSellerProducts = async (req, res) => {
  const { userEmail } = req.query;

  try {
    const allSellerProducts = await pool.query(queries.getAllSellerProducts, [
      userEmail,
    ]);
    res.status(200).json({ allSellerProducts: allSellerProducts.rows });
  } catch (error) {
    console.error("Error getting products: ", error);
    res
      .status(500)
      .json({ error: "Internal Server Error during getting products" });
  }
};

// get all products for store display purposes
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await pool.query(queries.getAllProducts);
    res.status(200).json({ allProducts: allProducts.rows });
  } catch (error) {
    console.error("Error getting products: ", error);
    res
      .status(500)
      .json({ error: "Internal Server Error during getting products" });
  }
};

const deleteProduct = async (req, res) => {
  const { productId, userEmail } = req.query;
  try {
    // delete product
    await pool.query(queries.deleteProduct, [productId]);
    // get all user products
    const allUserProducts = await pool.query(queries.getAllSellerProducts, [
      userEmail,
    ]);
    // send back message and all user products
    res.status(200).json({
      message: `Product with id: ${productId} deleted`,
      allUserProducts: allUserProducts.rows,
    });
  } catch (error) {
    console.error("Error deleting product: ", error);
    res
      .status(500)
      .json({ error: "Internal Server Error during product deletion" });
  }
};

module.exports = {
  addProduct,
  getAllSellerProducts,
  getAllProducts,
  deleteProduct,
};
