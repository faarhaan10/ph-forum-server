// app.js
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require('morgan')
const colors = require('colors');
const { readdirSync } = require("fs");
const db = require("./config/db.config");
const app = express();

//middle weares
const corsConfig = {
  origin: "*",
  // origin: ''
};
app.use(cors(corsConfig));
app.use(express.json());
app.use(morgan('tiny'))
app.use(express.json());
db();


// loop through the modules directory and import each module's index file
readdirSync("./src/modules").forEach((file) => {
  const module = require(`./src/modules/${file}`);

  app.use(`/api/${file}`, module.router);
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000!");
});
