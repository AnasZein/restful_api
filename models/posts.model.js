const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 25,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const PostModel = mongoose.model("posts", PostSchema);

module.exports = PostModel;
