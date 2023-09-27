const { getAllPosts, createPost } = require("../controllers/posts.controller");
const auth = require("../middlewares/authUser");

const router = require("express").Router();

router.use(auth);

router.get("/", getAllPosts);

router.post("/new", createPost);

module.exports = router;
