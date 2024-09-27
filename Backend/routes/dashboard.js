const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard");

router.post("/", dashboardController.createStore);

module.exports = router;
