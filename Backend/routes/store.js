const express = require("express");
const router = express.Router();
const storeController = require("../controllers/store");

router.post("/", storeController.store);

module.exports = router;
