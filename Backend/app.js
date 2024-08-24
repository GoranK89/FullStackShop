const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

require("dotenv").config();

const port = 3000;

app.use(express.static("public"));

// Middleware to parse JSON and URL encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// cookie parser
app.use(cookieParser());

// ROUTES
// REGISTER route
const registerRouter = require("./routes/register");
app.use("/register", registerRouter);

// LOGIN route
const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

// LOGOUT route
const logoutRouter = require("./routes/logout");
app.use("/logout", logoutRouter);

// STORE route
const storeRouter = require("./routes/store");
app.use("/store", storeRouter);

// Protected route
const protectedRouter = require("./routes/protected");
app.use("/protected", protectedRouter);

// Refresh Token route
const refreshTokenRouter = require("./routes/refreshToken");
app.use("/refresh_token", refreshTokenRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/*
Sellers who can: Register as Seller, Login, Setup their store, Add products, Edit products, Delete products, View Received Orders, Update Order Status (Pending, Shipped, Delivered), Buyers who can register, Login, Browse products by all sellers, Add products to cart, Checkout, View order history, View order status, Cancel order, View seller profile, View seller products
*/
