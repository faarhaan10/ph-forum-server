// products/index.js

const express = require("express");
const productsController = require("./controllers/products.controller");
const productsRoutes = require("./routes/products.routes");

const router = express.Router();

router.use("/", productsRoutes);

module.exports = {
  controller: productsController,
  router: router,
};
