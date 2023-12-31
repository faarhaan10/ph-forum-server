const mongoose = require("mongoose");



// Define the schema
const postSchema = new mongoose.Schema({
  postBody: {
    type: String,
    required: true,
  },
  postImage: {
    type: String,
  },
  batch: {
    type: Number,
  },
  category: {
    type: String,
    enum: ["assignment", "github", "quiz", "support-session", "other","module"],
    default: "other",
  },
  tags: {
    type: [String],
  },
  status: { 
        type: String,
        enum: ["new","inprogress", "investigate", "resolved", "unresolved", "rejected","testing"],
        default: "new", 
  },
  priority:  {
        type: String,
        enum: ["high", "medium", "low"],
  },
  upvotes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  comments: {
    type: [{type:String}],
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  isComment: {
    type: Boolean,
    default: true,
  },
  adminPost: {
    type: Boolean,
    default: false,
  },
  author: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
  },
  adminReplied: {
    type: Boolean,
    default: false,
  },
});

// Create the Mongoose model
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
