const UserModel = require("../models/users.model");
const createToken = require("../utils/createToken");

async function getAllUsers(req, res) {
  try {
    const users = await UserModel.find({});
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ error: "no users found" });
    }
  } catch (err) {
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "server error" });
  }
}

async function createUser(req, res) {
  try {
    const { username, password, email } = req.body;
    const user = await UserModel.create({ username, password, email });

    if (user) {
      res.status(201).json({ message: "user created succeffully" });
    } else {
      res.status(400).json({ message: "couldn't create user" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getOneUser(req, res) {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "could not find requested user" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function loginUser(req, res) {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (user) {
      if (user.password === password) {
        const token = createToken(user);
        res.status(200).json({ token });
        return;
      }
      res.status(401).json({ error: "incorrect username or password" });
    } else {
      res.status(404).json({ error: "user is not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getAllUsers, createUser, getOneUser, loginUser };
