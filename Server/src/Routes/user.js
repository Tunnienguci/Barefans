/** @format */
const express = require("express");
const router = express.Router();
const { getUser } = require("../Controllers/userController");

router.get("/", getUser);

module.exports = router;
