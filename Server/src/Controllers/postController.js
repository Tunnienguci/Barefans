/** @format */

const Post = require("../Model/post");
const User = require("../Model/user");
const cloudinary = require("cloudinary");

cloudinary.config({
	cloud_name: "dklzco9qq",
	api_key: "373915392656123",
	api_secret: "aZcW7jl0KqGUbgPIseARi3K85RY",
});

exports.createPost = async (req, res) => {
	const { content, images, video, emoji, user } = req.body;

	const newPost = new Post({
		user: user,
		like: 0,
		liked: false,
		content: content,
		images: images,
		video: video,
		emoji: emoji,
		time: new Date().toISOString(),
		comment: [],
	});
	try {
		const post = await newPost.save();

		const user = await User.findById(post.user);

		return res.status(200).json({
			message: "Đăng bài thành công",
			post: {
				_id: post._id,
				user: {
					username: user.account.username,
					fullName: user.fullName,
					birthday: user.birthday,
					avatar: user.avatar,
					bio: user.bio,
					hometown: user.hometown,
					live: user.live,
					relationship: user.relationship,
					facebook: user.facebook,
					twitter: user.twitter,
					instagram: user.instagram,
					linkedin: user.linkedin,
					highSchool: user.highSchool,
					secondarySchool: user.secondarySchool,
					college: user.college,
					posts: user.posts,
					university: user.university,
					albums: user.albums,
					friends: user.friends,
					requests: user.requests,
					verify: user.verify,
					_id: user._id,
				},
				content: post.content,
				images: post.images,
				video: post.video,
				emoji: post.emoji,
				like: post.like,
				liked: post.liked,
				comment: post.comment,
				time: post.time,
			},
		});
	} catch (error) {
		console.error("Lỗi server:", error);
		return res.status(500).json({
			message: "Lỗi server",
		});
	}
};

exports.getAllPost = async (req, res) => {
	try {
		const posts = await Post.find().populate("user");
		return res.status(200).json({
			// User không được trả về account.password và account.username
			posts: posts.map((post) => ({
				_id: post._id,
				user: {
					username: post.user.account.username,
					fullName: post.user.fullName,
					birthday: post.user.birthday,
					avatar: post.user.avatar,
					bio: post.user.bio,
					hometown: post.user.hometown,
					live: post.user.live,
					relationship: post.user.relationship,
					facebook: post.user.facebook,
					twitter: post.user.twitter,
					instagram: post.user.instagram,
					linkedin: post.user.linkedin,
					highSchool: post.user.highSchool,
					secondarySchool: post.user.secondarySchool,
					college: post.user.college,
					posts: post.user.posts,
					university: post.user.university,
					albums: post.user.albums,
					friends: post.user.friends,
					requests: post.user.requests,
					verify: post.user.verify,
					_id: post.user._id,
				},
				content: post.content,
				images: post.images,
				video: post.video,
				emoji: post.emoji,
				like: post.like,
				liked: post.liked,
				comment: post.comment,
				time: post.time,
			})),
		});
	} catch (error) {
		console.error("Lỗi server:", error);
		return res.status(500).json({
			message: "Lỗi server",
		});
	}
};

exports.getPostFromUser = async (req, res) => {
	const { username } = req.query;

	try {
		const posts = await Post.find({
			"user.account.username": username,
		}).populate("user");
		return res.status(200).json({
			posts: posts.map((post) => ({
				_id: post._id,
				user: {
					username: post.user.account.username,
					fullName: post.user.fullName,
					birthday: post.user.birthday,
					avatar: post.user.avatar,
					bio: post.user.bio,
					hometown: post.user.hometown,
					live: post.user.live,
					relationship: post.user.relationship,
					facebook: post.user.facebook,
					twitter: post.user.twitter,
					instagram: post.user.instagram,
					linkedin: post.user.linkedin,
					highSchool: post.user.highSchool,
					secondarySchool: post.user.secondarySchool,
					college: post.user.college,
					posts: post.user.posts,
					university: post.user.university,
					albums: post.user.albums,
					friends: post.user.friends,
					requests: post.user.requests,
					verify: post.user.verify,
					_id: post.user._id,
				},
				content: post.content,
				images: post.images,
				video: post.video,
				emoji: post.emoji,
				like: post.like,
				liked: post.liked,
				comment: post.comment,
				time: post.time,
			})),
		});
	} catch (error) {
		return res.status(500).json({
			message: "Lỗi server",
		});
	}
};

exports.removePost = async (req, res) => {
	const { id } = req.body;
	try {
		const result = await Post.deleteOne(id);
		return res.status(200).json({
			message: "Xóa bài viết thành công",
		});
	} catch (error) {
		console.error("Lỗi server:", error);
		return res.status(500).json({
			message: "Lỗi server",
		});
	}
};
