
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  batch: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Define a static method for finding a user by email
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email });
};


module.exports = mongoose.model("User", userSchema);
