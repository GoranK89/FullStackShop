const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users");

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", usersController.login);

module.exports = router;
