const mongoose = require("../libs/db");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  content: {
    type: String,
    minlength: 1,
    maxlength: 30000,
    required: true
  },
  datePublished: {
    type: Date,
    required: true,
    default: () => new Date()
  }
});

exports.Article = mongoose.model("Article", articleSchema);
