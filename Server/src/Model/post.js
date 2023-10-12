/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	content: {
		type: String,
	},
	images: {
		type: Array,
	},
	video: {
		type: Array,
	},
	emoji: {
		type: String,
	},
	like: {
		type: Array,
	},
	comment: [
		{
			type: Schema.Types.ObjectId,
			ref: "Comment",
		},
	],
	time: {
		type: String,
	},
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
