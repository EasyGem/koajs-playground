const mongoose = require("mongoose");
require("dotenv").config();

const settings = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose
  .connect("mongodb://localhost:27017/koa-blog", settings)
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.log("Error occured connecting to MongoDB:", err));

module.exports = mongoose;
