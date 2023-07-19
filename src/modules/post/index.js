// posts/index.js

const express = require("express");
const postController = require("./controllers/post.controller");
const postsRoutes = require("./routes/post.routes");

const router = express.Router();

router.use("/", postsRoutes);

module.exports = {
  controller: postController,
  router: router,
};
