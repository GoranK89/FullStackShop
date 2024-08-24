const express = require("express");
const router = express.Router();
const refreshTokenControler = require("../controllers/refreshToken");

router.post("/", refreshTokenControler.refreshToken);

module.exports = router;
