/** @format */
const express = require("express");
const router = express.Router();
const {
	login,
	register,
	updateProfile,
} = require("../Controllers/authController");

router.post("/sign-in", login);
router.post("/sign-up", register);
router.post("/sign-up/update-profile", updateProfile);

module.exports = router;
