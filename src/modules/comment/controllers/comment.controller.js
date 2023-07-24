const Comment = require("../models/comment.model");
const Post = require("../../post/models/post.model");

// all comments for an array of comment ids
exports.addComment = async (req, res) => {
  try {
    const doc = req.body;
    console.log(8,doc);
    const comment = await Comment.create(doc);
    await Post.findByIdAndUpdate(doc.post, {
      $push: { comments: comment._id },
    });
    
    res.send({ success: true, comment });
  } catch (err) {
    res
      .status(500)
      .send({
        success: false,
        message: "Error fetching comments",
        error: err.message,
      });
  }
};

// all comments for an array of comment ids
exports.getCommentsByIds = async (req, res) => {
  try {
    const commentIds = req.body.commentIds;
    const comments = await Comment.find({ _id: { $in: commentIds } }).populate(
      "user",
      "name image"
    );
    res.send(comments);
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error fetching comments", error: err.message });
  }
};

// delete a comment by id
exports.deleteCommentById = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res
        .status(404)
        .send({ success: false, message: "Comment not found" });
    }

    await Post.findByIdAndUpdate(deletedComment.post, {
      $pull: { comments: commentId },
    });

    res
      .status(200)
      .send({ success: true, message: "Comment deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error deleting comment", error: err.message });
  }
};
