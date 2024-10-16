const pool = require("../db");
const queries = require("../psqlQuerries/queries");

const addProduct = async (req, res) => {
  const { userEmail } = req.query;

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
      userEmail,
      productName,
      productDescription,
      productPrice,
      productStock,
      storeId,
    ];
  } else {
    query = queries.addProductWithoutStoreId;
    values = [
      userEmail,
      productName,
      productDescription,
      productPrice,
      productStock,
    ];
  }

  try {
    // store products in DB
    await pool.query(query, values);
    // get all user products
    const allUserProducts = await pool.query(queries.getAllUserProducts, [
      userEmail,
    ]);
    // send back message and all user products
    res.status(200).json({
      message: `Product: "${productName}" added`,
      allUserProducts: allUserProducts.rows,
    });
  } catch (error) {
    console.error("Error adding product: ", error);
    res
      .status(500)
      .json({ error: "Internal Server Error during product addition" });
  }
};

const getAllProducts = async (req, res) => {
  const { userEmail } = req.query;

  try {
    const allUserProducts = await pool.query(queries.getAllUserProducts, [
      userEmail,
    ]);
    res.status(200).json({ allUserProducts: allUserProducts.rows });
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
    const allUserProducts = await pool.query(queries.getAllUserProducts, [
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

const addProductToStore = async (req, res) => {
  const { userEmail } = req.query;
  const { storeId } = req.params;
  const productIds = req.body;
  try {
    // loop through productIds and add storeId to store_ids column, duplicates are handled in the query
    for (const productId of productIds) {
      await pool.query(queries.addProductsToStore, [storeId, productId]);
    }

    const allUserProducts = await pool.query(queries.getAllUserProducts, [
      userEmail,
    ]);

    res.status(200).json({
      message: "Products added to store",
      allUserProducts: allUserProducts.rows,
    });
  } catch (error) {
    console.error("Error adding products to store: ", error);
    res
      .status(500)
      .json({ error: "Internal Server Error during adding products to store" });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  deleteProduct,
  addProductToStore,
};
