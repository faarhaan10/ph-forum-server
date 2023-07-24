const express = require("express");
const postController = require("../controllers/post.controller");

const router = express.Router();

router.get("/", postController.getPosts);
router.get("/trending", postController.getTrendingPost);
router.get("/progress", postController.getProgress);
router.get("/single/:id", postController.getPostById);
router.post("/like/:id", postController.likePost);
router.delete("/:id", postController.deletePost);
router.post("/", postController.createPost);
router.put("/:id", postController.updatePost);



module.exports = router;
