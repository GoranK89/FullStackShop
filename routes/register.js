const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("register");
});

router.post("/", (req, res) => {
  const { email, password } = req.body;
  res.status(200).json({ message: `Email ${email} registered` });
});

// chain multiple methods to the same route
router
  .route("/:id")
  .get((req, res) => {
    res.send(`GET User with id: ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`UPDATE User with id: ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`DELETE User with id: ${req.params.id}`);
  });

module.exports = router;
