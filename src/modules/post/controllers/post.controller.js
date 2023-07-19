
const User = require("../../users/models/user.model");
const Post = require("../models/post.model");

exports.getPosts = async (req, res) => {
  try {
    const Posts = await Post.find();
    res.status(200).send(Posts);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const Post = await Post.findById(req.params.id);
    if (!Post) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.status(200).send(Post);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.createPost = async (req, res) => {
    try {
        const user = await User.findById(req.body.authorId)
        
        const doc = {
            authorName:user.name,
            batch: user.batch,
            authorImage: user.image,
            ...req.body
        }
    const post = await Post.create(doc);
    res.status(200).send({ success: true, insertedId: post._id ,post});
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false,message: "Internal server error" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const Post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!Post) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.status(200).send(Post);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const Post = await Post.findByIdAndDelete(req.params.id);
    if (!Post) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};
