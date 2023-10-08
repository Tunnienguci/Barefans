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
	liked: {
		type: Boolean,
		default: false,
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

module.exports = mongoose.model("Post", postSchema);
