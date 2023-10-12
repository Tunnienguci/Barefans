/** @format */

const mongoose = require("mongoose");
const { Schema } = mongoose;

const projectSchema = new Schema({
	projectName: {
		type: String,
	},
	startDate: {
		type: Date,
		default: null,
	},
	endDate: {
		type: Date,
		default: null,
	},
	typeProject: {
		type: String,
	},
	members: {
		type: Number,
		default: 0,
	},
	softwareDevelopment: {
		type: String,
	},
	dailyMeetingTime: {
		type: String,
	},
	logWorkTime: {
		type: String,
	},
	description: {
		type: String,
	},
	fileDoc01: {
		type: String,
	},
	fileDoc02: {
		type: String,
	},
	fileDoc03: {
		type: String,
	},
	meetingRoom: {
		type: String,
	},
	progressCheck: {
		type: String,
	},
	checkingTask: {
		type: String,
	},
	github: {
		type: String,
	},
	gitlab: {
		type: String,
	},
	docker: {
		type: String,
	},
	note: {
		type: String,
	},
	contributes: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
