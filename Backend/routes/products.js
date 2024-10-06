const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.addProduct)
  .delete(productController.deleteProduct);

router
  .route("/:storeId/add-product-to-store")
  .post(productController.addProductToStore);

module.exports = router;
