const mongoose = require("mongoose"); 

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  let error;
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected successfully...`.bold.blue);
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`.red);
    process.exit(1);
  }
 
  return error;
};

module.exports = connectDB;
