// users/controllers/users.controller.js
const jwtUtils = require("../../../../utils/jwtUtils");
const User = require("../models/user.model");

const secretKey = process.env.JWT_SECRET;

//register
exports.createUser = async (req, res) => {
  try {
    const exists = await User.findOne({ email: req.body?.email });
    if (exists) {
      return res.send({success:false, message: "User already exists." });
    }

    const user = await User.create(req.body);
    const payload = { email: user.email, id: user._id };
    const token = jwtUtils.generateToken(payload, secretKey, "5h");
    res.send({ success:true, token });
  } catch (err) {
    console.log(err);
    res.send({ success:false,message: "Internal server error" });
  }
};

//login
exports.loginUser = async (req, res) => {
  try {
    const user = await User.findByEmail(req.body?.email);
    if (!user) {
      return res.send({ success:false,message: "User not found" });
    }

    // Validate the password
    if (req.body.password !== user.password) {
      return res.send({success:false, message: "Invalid password" });
    }

    // Generate JWT
    const payload = { email: user.email, id: user._id };
    const token = jwtUtils.generateToken(payload, secretKey, "1h");
    res.send({ success:true, token });
  } catch (err) {
    console.log(err);
    res.send({ success:false,message: "Internal server error" });
  }
};

// get user details using token
exports.getUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    
    if (!token) {
      return res.status(401).send({ error: "Authorization token not found" });
    }

// verify token 

    const decodedToken = jwtUtils.verifyToken(token, secretKey);
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(404).send({success:false, message: "User not found" });
    }
    res.status(200).send(user);
 
  } catch (err) {
    console.log(err);
    res.status(500).send({success:false, message: "Internal server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({success:false, message: "User not found" });
    }
    res.status(204).send();
  } catch (err) {
    console.log(err);
    res.status(500).send({ success:false,message: "Internal server error" });
  }
};
