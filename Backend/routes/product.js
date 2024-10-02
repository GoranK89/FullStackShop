const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");

router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.addProduct)
  .delete(productController.deleteProduct);

module.exports = router;
