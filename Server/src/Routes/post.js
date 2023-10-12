/** @format */
const express = require("express");
const router = express.Router();
const {
	createPost,
	getAllPost,
	getPostFromUser,
	removePost,
	likePost,
	commentPost,
	removeCommentById,
	getLatestPost,
	getPostById,
} = require("../Controllers/postController");

router.post("/create", createPost);
router.get("/", getAllPost);
router.get("/userpost", getPostFromUser);
router.delete("/delete", removePost);
router.post("/like", likePost);
router.post("/comment", commentPost);
router.put("/comment/delete", removeCommentById);
router.get("/latest", getLatestPost);
router.get("/postDetail", getPostById);

module.exports = router;
