/** @format */
const express = require("express");
const router = express.Router();
const {
	createPost,
	getAllPost,
	getPostFromUser,
	removePost,
	likePost,
} = require("../Controllers/postController");

router.post("/create", createPost);
router.get("/", getAllPost);
router.get("/userpost", getPostFromUser);
router.delete("/delete", removePost);
router.put("/like", likePost);

module.exports = router;
