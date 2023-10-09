/** @format */
const express = require("express");
const router = express.Router();
const {
	getUser,
	followUser,
	acceptFollow,
	getReceiveRequest,
	rejectFollow,
	getFriends,
} = require("../Controllers/userController");

router.get("/", getUser);
router.post("/follow", followUser);
router.post("/follow/accept", acceptFollow);
router.post("/follow/reject", rejectFollow);
router.get("/myreceive", getReceiveRequest);
router.get("/myfriend", getFriends);

module.exports = router;
