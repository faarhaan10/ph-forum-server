// users/routes/users.routes.js

const express = require("express");
const usersController = require("../controllers/users.controller");

const router = express.Router();

router.get("/", usersController.getUser);
router.post("/login", usersController.loginUser);
router.post("/register", usersController.createUser);
// router.get("/:id", usersController.getUserById);
// router.delete("/:id", usersController.deleteUser);

module.exports = router;
