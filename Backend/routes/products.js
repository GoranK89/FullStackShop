const express = require("express");
const router = express.Router();
const productController = require("../controllers/products");

router
  .route("/")
  .get(productController.getAllSellerProducts)
  .post(productController.addProduct)
  .delete(productController.deleteProduct);

router.route("/all").get(productController.getAllProducts);

module.exports = router;
