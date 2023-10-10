/** @format */

const axios = require("axios");
const Post = require("../Model/post");
const { set } = require("mongoose");

// Địa chỉ URL của API
const apiUrl = "https://sv.vtcnews.vn/NewsV2/GetDataCategory?categoryId=28";

// Tạo một đối tượng yêu cầu GET đến API
setInterval(() => {
	console.log("Cron job is running");
	axios
		.get(apiUrl)
		.then((response) => {
			// Xử lý dữ liệu trả về từ API
			const data = response.data.listNews;
			data.forEach((item) => {
				const newPost = new Post({
					user: "6524ef52832f2454ab19ae01",
					like: [],
					content: `${item.title} \n ${item.description}`,
					images: [item.image.medium],
					video: video,
					emoji: emoji,
					time: new Date().toISOString(),
					comment: [],
				});
				// Lưu vào database
				newPost.save();
			});

			return res.status(200).json({
				message: "Posted successfully",
				post: {
					_id: post._id,
					user: {
						username: user.account.username,
						fullName: user.fullName,
						avatar: user.avatar,
						_id: user._id,
					},
					like: post.like,
					content: post.content,
					images: post.images,
					video: post.video,
					emoji: post.emoji,
					time: post.time,
					comment: post.comment,
				},
			});
		})
		.catch((error) => {
			return res.status(500).json({
				message: "Cannot connect to server",
				error: error.message,
			});
		});
}, 1000);
