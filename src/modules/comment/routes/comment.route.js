const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');

//post a comment
router.post('/', commentController.addComment);

//get all comments by ids
router.post('/ids', commentController.getCommentsByIds);

//delete by id
router.delete('/:commentId', commentController.deleteCommentById);

module.exports = router;
