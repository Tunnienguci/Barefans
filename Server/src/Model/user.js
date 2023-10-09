/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
	fullName: {
		type: String,
		required: true,
	},
	birthday: {
		type: String,
	},
	avatar: {
		type: String,
		default:
			"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a4da7488-f077-4995-8bba-db65531de878/d9rpgq9-37d54773-6e51-4714-86a3-d1d9e63c0895.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2E0ZGE3NDg4LWYwNzctNDk5NS04YmJhLWRiNjU1MzFkZTg3OFwvZDlycGdxOS0zN2Q1NDc3My02ZTUxLTQ3MTQtODZhMy1kMWQ5ZTYzYzA4OTUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.JR56uj2bnszXt_k2KIJRm9umhlDIqVwGne7PhlLSJD4",
	},
	bio: {
		type: String,
	},
	email: {
		type: String,
	},
	hometown: {
		type: String,
	},
	live: {
		type: String,
	},
	relationship: {
		type: String,
	},
	facebook: {
		type: String,
	},
	twitter: {
		type: String,
	},
	instagram: {
		type: String,
	},
	linkedin: {
		type: String,
	},
	secondarySchool: {
		type: String,
	},
	highSchool: {
		type: String,
	},
	college: {
		type: String,
	},
	university: {
		type: String,
	},
	work: {
		company: {
			type: String,
		},
		position: {
			type: String,
		},
	},
	posts: [
		{
			type: Schema.Types.ObjectId,
			ref: "Post",
		},
	],
	albums: {
		type: Array,
	},
	friends: [
		{
			type: Schema.Types.ObjectId,
			ref: "User",
		},
	],
	requests: [
		{
			sendRequest: {
				type: Schema.Types.ObjectId,
				ref: "User",
			},
			receiveRequest: {
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		},
	],
	account: {
		username: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
		},
		permission: {
			type: String,
			default: "user",
		},
		token: {
			type: String,
		},
	},
	verify: {
		type: Boolean,
		default: false,
	},
});

const User = mongoose.model("User", userSchema);
module.exports = User;
