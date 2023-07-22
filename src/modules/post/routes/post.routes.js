const express = require("express");
const postController = require("../controllers/post.controller");

const router = express.Router();

router.get("/", postController.getPosts);
router.get("/:id", postController.getPostById);
router.get("/batch/:batchNumber", postController.getPostByBatch);
router.post("/", postController.createPost);
router.put("/:id", postController.updatePost);
router.delete("/:id", postController.deletePost);

module.exports = router;
