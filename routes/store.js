const express = require("express");
const router = express.Router();
const storeController = require("../controllers/store");

router.get("/", (req, res) => {
  //   res.render("store");
  res.send("store page");
});

router.post("/", storeController.store);

module.exports = router;
