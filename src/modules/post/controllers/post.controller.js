const User = require("../../users/models/user.model");
const Post = require("../models/post.model");
const mongoose = require("mongoose");



exports.getPosts = async (req, res) => {
  try {
    const aggregationPipeline = [];

    console.log(10, req.query);
    
    //by batch
    if (req.query.batch) {
      aggregationPipeline.push({
        $match: {
          batch: parseInt(req.query.batch),
        },
      });
    }

    //pririty
    if (req.query.priority) {
      aggregationPipeline.push({
        $match: {
          priority: req.query.priority,
        },
      });
    }

    //by user
    if (req.query.author) {
      aggregationPipeline.push({
        $match: {
          author:new mongoose.Types.ObjectId(req.query.author)
        },
      });
    }
    //by admin
    if (req.query.adminPost == "true") {
      aggregationPipeline.push({
        $match: {
          adminPost: true,
        },
      });
    }
    //by admin
    if (req.query.adminReplied == "false" &&req.query.adminPost == "false" ) {
      aggregationPipeline.push({
        $match: {
          adminReplied: false,
        },
      });
    }
    //by status
    if (req.query.status) {
      aggregationPipeline.push({
        $match: {
          status: req.query.status,
        },
      });
    }
    //by category
    if (req.query.category) {
      aggregationPipeline.push({
        $match: {
          category: req.query.category,
        },
      });
    }
    //by tags
    if (req.query.tags) {
      const isAr = Array.isArray(req.query.tags)
      aggregationPipeline.push({
        $match: {
          tags: { $in: isAr?req.query.tags:[req.query.tags] }
        },
      });
    }

    if (req.query.fromDate && req.query.toDate) {
      aggregationPipeline.push({
        $match: {
          timestamp: {
            $gte: new Date(req.query.fromDate),
            $lte: new Date(req.query.toDate),
          },
        },
      });
    }

    if (req.query.timestamp) {
      aggregationPipeline.push({
        $match: {
          timestamp: { $lte: new Date(req.query.timestamp) },
        },
      });
    }

    // Add the $lookup stage to join the User collection
    aggregationPipeline.push({
      $lookup: {
        from: 'users', // The name of the User collection
        localField: 'author',
        foreignField: '_id',
        as: 'authorInfo',
      },
    });

    // Unwind the authorInfo array to get a single object for each post
    aggregationPipeline.push({
      $unwind: {
        path: '$authorInfo',
        preserveNullAndEmptyArrays: true, // Preserve posts without an author
      },
    });

    // Project to include only the required fields from authorInfo
    aggregationPipeline.push({
      $project: {
        postBody: 1,
        postImage: 1,
        batch: 1,
        category: 1,
        tags: 1,
        status: 1,
        priority: 1,
        upvotes: 1,
        comments: 1,
        timestamp: 1,
        isComment: 1,
        adminPost: 1,
        adminReplied: 1,
        author: '$authorInfo.name',
        authorImage: '$authorInfo.image',
        authorId: '$authorInfo._id',
        authorBatch: '$authorInfo.batch',
        upvoteCount: { $size: '$upvotes' },
        commentsCount: { $size: '$comments' },
      },
    });

    // Sort the posts
    aggregationPipeline.push({
      $sort: {
        batch: -1,
        timestamp: -1,
        priority: -1,
        upvoteCount: -1,
        commentsCount: -1,
      },
    });

    // Execute the aggregation pipeline
    const posts = await Post.aggregate(aggregationPipeline);
    res.send(posts);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: 'Internal server error' });
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
exports.getPostByBatch = async (req, res) => {
  try {
    const post = await Post.find({
      batch: req.params.batchNumber,
      ...req.query,
    }).populate("author", "name image batch");
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.status(200).send(post);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).send({ success: true, insertedId: post._id });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.status(200).send({success: true, message:'Updated post'});
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    res.status(204).send({succes: true});
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
};


exports.likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.body.userId; 
    console.log(postId, userId);

    // Check post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userLiked = post.upvotes.includes(userId);

    if (userLiked) { 
      post.upvotes.pull(userId);
    } else { 
      post.upvotes.push(userId);
    }

    await post.save();

    res.send({success:true, message: 'Liked successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to update like' });
  }
};
