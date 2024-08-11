const express = require("express");
const app = express();

require("dotenv").config();

const port = 3000;

app.use(express.static("public"));

// Middleware to parse JSON and URL encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set the view engine to ejs
app.set("view engine", "ejs");

// ROUTES
// Home route
app.get("/", (req, res) => {
  res.render("index");
});

// REGISTER route
const registerRouter = require("./routes/register");
app.use("/register", registerRouter);

// LOGIN route
const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/*
Sellers who can: Register as Seller, Login, Setup their store, Add products, Edit products, Delete products, View Received Orders, Update Order Status (Pending, Shipped, Delivered), Buyers who can register, Login, Browse products by all sellers, Add products to cart, Checkout, View order history, View order status, Cancel order, View seller profile, View seller products
*/
