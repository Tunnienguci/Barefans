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
	updateAvatar,
	updateProfile,
	updateBio,
} = require("../Controllers/userController");

router.get("/", getUser);
router.post("/follow", followUser);
router.post("/follow/accept", acceptFollow);
router.post("/follow/reject", rejectFollow);
router.get("/myreceive", getReceiveRequest);
router.get("/myfriend", getFriends);
router.put("/update/avatar", updateAvatar);
router.post("/update-profile", updateProfile);
router.post("/bio", updateBio);

module.exports = router;
