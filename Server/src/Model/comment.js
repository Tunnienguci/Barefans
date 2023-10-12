/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	content: {
		type: String,
	},
	time: {
		type: String,
	},
});

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
