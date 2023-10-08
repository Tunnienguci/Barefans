/** @format */

const User = require("../Model/user");
const Post = require("../Model/post");
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
		like: [],
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
		user.posts.push(post._id);
		const processImg = post.images.forEach((img) => {
			user.albums.push(img);
		});
		await processImg;
		await user.save();

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
			posts: posts
				.map((post) => ({
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
					comment: post.comment,
					time: post.time,
				}))
				.reverse(),
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
		const user = await User.findOne({ "account.username": username });
		const posts = await Post.find({ user: user._id }).populate("user");
		return res.status(200).json({
			posts: posts
				.map((post) => ({
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
					comment: post.comment,
					time: post.time,
				}))
				.reverse(),
		});
	} catch (error) {
		return res.status(500).json({
			message: "Lỗi server",
		});
	}
};

exports.removePost = async (req, res) => {
	const { id } = req.query;
	try {
		const result = await Post.findByIdAndDelete(id);
		return res.status(200).json({
			message: "Xóa bài viết thành công",
			result: result,
		});
	} catch (error) {
		console.error("Lỗi server:", error);
		return res.status(500).json({
			message: "Lỗi server",
		});
	}
};

exports.likePost = async (req, res) => {
	const { id, user } = req.body;

	try {
		const post = await Post.findById(id);
		if (post.like.includes(user)) {
			post.like = post.like.filter((item) => item !== user);
		} else {
			post.like.push(user);
		}
		await post.save();
		return res.status(200).json({
			message: "Thành công",
			post: post,
		});
	} catch (error) {
		console.error("Lỗi server:", error);
		return res.status(500).json({
			message: "Lỗi server",
		});
	}
};

exports.commentPost = async (req, res) => {
	const { id, user, content } = req.body;

	try {
		const post = await Post.findById(id);
		post.comment.push({
			id: Math.floor(Math.random() * 100000000000000000).toString(),
			user: user,
			content: content,
			time: new Date().toISOString(),
		});
		await post.save();
		return res.status(200).json({
			message: "Thành công",
			post: post,
		});
	} catch (error) {
		console.error("Lỗi server:", error);
		return res.status(500).json({
			message: "Lỗi server",
		});
	}
};

exports.removeCommentById = async (req, res) => {
	const { id, commentId } = req.query;

	try {
		const post = await Post.findById(id);
		post.comment = post.comment.filter((item) => item.id != commentId);
		await post.save();
		return res.status(200).json({
			message: "Thành công",
			post: post,
		});
	} catch (error) {
		console.error("Lỗi server:", error);
		return res.status(500).json({
			message: "Lỗi server",
		});
	}
};
