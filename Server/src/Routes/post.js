/** @format */
const express = require("express");
const router = express.Router();
const {
	createPost,
	getAllPost,
	getPostFromUser,
	removePost,
} = require("../Controllers/postController");

router.post("/create", createPost);
router.get("/", getAllPost);
router.get("/user", getPostFromUser);
router.delete("/delete", removePost);

module.exports = router;
