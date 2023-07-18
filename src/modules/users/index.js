// users/index.js

const express = require("express");
const usersController = require("./controllers/users.controller");
const usersRoutes = require("./routes/users.routes");

const router = express.Router();

router.use("/", usersRoutes);

module.exports = {
  controller: usersController,
  router: router,
};
