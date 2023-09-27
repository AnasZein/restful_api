const PostModel = require("../models/posts.model");
const UserModel = require("../models/users.model");

async function getAllPosts(req, res) {
  try {
    const posts = await PostModel.find();
    if (posts) {
      res.status(200).json({ data: posts });
    } else {
      res.status(404).json({ error: "no posts found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createPost(req, res) {
  // const post = req.body;
  // post.author = id
  // const newPost = await PostModel.create(post);

  const id = req.user.id;
  req.body.author = id;
  const newPost = await PostModel.create(req.body);

  // PostModel.create(req.body).then((newPost)=>{
  //     res.json(newPost);
  // })

  if (newPost) {
    const user = await UserModel.findById(id);
    user.posts.push(newPost._id);
    await user.save();
    res.status(201).json(newPost);
  } else {
    res.status(400).json({ error: "could not post please try again" });
  }
}

module.exports = { getAllPosts, createPost };
