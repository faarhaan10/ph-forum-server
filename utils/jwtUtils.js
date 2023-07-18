const jwt = require('jsonwebtoken');

// generate token
const generateToken = (payload, secretKey, expiresIn) => {
    return jwt.sign(payload, secretKey, { expiresIn });
  };
  
  //verify token
  const verifyToken = (token, secretKey) => {
    try {
      return jwt.verify(token, secretKey);
    } catch (error) {
      throw new Error("Invalid token");
    }
  };
  
  module.exports = { generateToken, verifyToken };
  