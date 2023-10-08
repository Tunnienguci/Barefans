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
router.post("/accept", acceptFollow);
router.post("/reject", rejectFollow);
router.get("/myreceive", getReceiveRequest);
router.get("/myfriend", getFriends);

module.exports = router;
