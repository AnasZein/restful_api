const express = require("express");
const {
  getAllUsers,
  createUser,
  getOneUser,
  loginUser,
} = require("../controllers/users.controller");

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getOneUser);

router.post("/login", loginUser);

router.post("/", createUser);

module.exports = router;
