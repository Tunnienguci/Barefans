/** @format */
const express = require("express");
const router = express.Router();
const {
	login,
	register,
	getMyUser,
	updateProfile,
} = require("../Controllers/authController");

router.post("/login", login);
router.post("/register", register);
router.get("/myuser", getMyUser);
router.post("/register/update-profile", updateProfile);

module.exports = router;
