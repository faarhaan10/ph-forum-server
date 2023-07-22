const express = require("express");
const router = express.Router();
const commentController = require("./controllers/comment.controller");
const commentsRoutes = require("./routes/comment.route");


router.use("/", commentsRoutes);

module.exports = {
  controller: commentController,
  router: router,
};
