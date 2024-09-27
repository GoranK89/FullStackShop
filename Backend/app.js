const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const port = 5000;

// Configure CORS options
const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend's origin
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Enable CORS for all routes with the specified options
app.use(cors(corsOptions));
// cookie parser
app.use(cookieParser());
// Middleware to parse JSON and URL encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

const dashboardRouter = require("./routes/dashboard");
app.use("/dashboard", dashboardRouter);

const productRouter = require("./routes/product");
app.use("/product", productRouter);

// Refresh Token route
const refreshTokenRouter = require("./routes/refreshToken");
app.use("/refresh", refreshTokenRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// chain multiple methods to the same route - routes
// router
//   .route("/:id")
//   .get((req, res) => {
//     res.send(`GET User with id: ${req.params.id}`);
//   })
//   .put((req, res) => {
//     res.send(`UPDATE User with id: ${req.params.id}`);
//   })
//   .delete((req, res) => {
//     res.send(`DELETE User with id: ${req.params.id}`);
//   });
