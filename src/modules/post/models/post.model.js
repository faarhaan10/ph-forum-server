const mongoose = require("mongoose");

// Define the schema
const postSchema = new mongoose.Schema({
  postBody: {
    type: String,
    required: true,
  },
  postImage: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["assignment", "github", "quiz", "support session", "other"],
    default: "other",
  },
  tags: {
    type: [String],
  },
  status: { 
        type: String,
        enum: ["new", "investigate", "resolved", "unresolved", "rejected"],
        default: "new", 
  },
  priority:  {
        type: String,
        enum: ["high", "medium", "low"],
  },
  upvotes: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  comments: {
    type: [String],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  batch: {
    type: Number,
  },
  isComment: {
    type: Boolean,
    default: true,
  },
  adminPost: {
    type: Boolean,
    default: false,
  },
  authorId: {
    type: String,
  },
  authorName: {
    type: String,
  },
  authorImage: {
    type: String,
  },
  adminReplied: {
    type: Boolean,
    default: false,
  },
});

// Create the Mongoose model
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
