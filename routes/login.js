const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", (req, res) => {
  // if seller, redirect to seller route
  // if buyer, redirect to buyer route
  res.redirect("/securedRoute");
});

module.exports = router;
