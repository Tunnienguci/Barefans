/** @format */
require("dotenv").config();
require("./src/Controllers/newsController");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./src/Routes/auth");
const userRoutes = require("./src/Routes/user");
const postRoutes = require("./src/Routes/post");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.URI).then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
});

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);
