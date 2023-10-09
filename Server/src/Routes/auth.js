/** @format */
const express = require("express");
const router = express.Router();
const {
	login,
	register,
	getMyUser,
	updateProfile,
} = require("../Controllers/authController");

router.post("/sign-in", login);
router.post("/sign-up", register);
router.get("/my-user", getMyUser);
router.post("/sign-up/update-profile", updateProfile);

module.exports = router;
