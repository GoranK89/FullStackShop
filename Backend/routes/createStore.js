const express = require("express");
const router = express.Router();
const createStoreController = require("../controllers/createStore");

router.post("/", createStoreController.createStore);

module.exports = router;
