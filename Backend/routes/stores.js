const express = require("express");
const router = express.Router();
const storesController = require("../controllers/stores");

// chain multiple methods to the same route - routes
router
  .route("/")
  .get(storesController.getStores)
  .post(storesController.createStore)
  .delete(storesController.deleteStore);

module.exports = router;
