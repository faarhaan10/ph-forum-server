const mongoose = require("mongoose"); 
require("dotenv").config();
const connectDB = async () => {
  // const uri = process.env.MONGODB_URI;
  const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASS}@cluster0.telyg.mongodb.net/?retryWrites=true&w=majority`
  
  let error;
  try {
    const conn =  mongoose.connect(uri);
    console.log(`MongoDB connected successfully...`.bold.blue);
  } catch (err) {
    console.error(`MongoDB connection error: ${err}`.red);
    process.exit(1);
  }
 
  return error;
};

module.exports = connectDB;
