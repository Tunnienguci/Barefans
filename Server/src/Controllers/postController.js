/** @format */

const User = require("../Model/user");
const Post = require("../Model/post");
const Comment = require("../Model/comment");
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
			message: "Posted successfully",
			post: {
				_id: post._id,
				user: {
					username: user.account.username,
					fullName: user.fullName,
					avatar: user.avatar,
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
		return res.status(500).json({
			message: "Cannot connect to server",
		});
	}
};

exports.getAllPost = async (req, res) => {
	try {
		const posts = await Post.find().populate("user");
		const commentFromPost = await Promise.all(
			posts.map(async (post) => {
				const comment = await Promise.all(
					post.comment.map(async (item) => {
						const _id = item.toString();
						const comment$ = await Comment.findById(_id).populate(
							"user"
						);
						return comment$;
					})
				);
				return comment;
			})
		);

		// Lấy thông tin comment và tham chiếu sang comment ở post
		posts.forEach((post, index) => {
			post.comment = commentFromPost[index];
		});

		return res.status(200).json({
			// User không được trả về account.password và account.username
			posts: posts
				.map((post) => ({
					_id: post._id,
					user: {
						username: post.user.account.username,
						fullName: post.user.fullName,
						avatar: post.user.avatar,
						_id: post.user._id,
					},
					content: post.content,
					images: post.images,
					video: post.video,
					emoji: post.emoji,
					like: post.like,
					comment: post.comment.map((item) => ({
						user: {
							username: item.user.account.username,
							fullName: item.user.fullName,
							avatar: item.user.avatar,
							_id: item.user._id,
						},
						content: item.content,
						time: item.time,
						_id: item._id,
					})),
					time: post.time,
				}))
				.reverse(),
		});
	} catch (error) {
		return res.status(500).json({
			message: "Cannot connect to server",
		});
	}
};

exports.getPostFromUser = async (req, res) => {
	const { username } = req.query;

	try {
		const user = await User.findOne({ "account.username": username });
		const posts = await Post.find({ user: user._id }).populate("user");
		const commentByPost = await Promise.all(
			posts.map(async (post) => {
				const comment = await Promise.all(
					post.comment.map(async (item) => {
						const _id = item.toString();
						const comment$ = await Comment.findById(_id).populate(
							"user"
						);
						return comment$;
					})
				);
				return comment;
			})
		);

		// Lấy thông tin comment và tham chiếu sang comment ở post
		posts.forEach((post, index) => {
			post.comment = commentByPost[index];
		});

		return res.status(200).json({
			posts: posts
				.map((post) => ({
					_id: post._id,
					user: {
						username: post.user.account.username,
						fullName: post.user.fullName,
						avatar: post.user.avatar,
						_id: post.user._id,
					},
					content: post.content,
					images: post.images,
					video: post.video,
					emoji: post.emoji,
					like: post.like,
					comment: post.comment.map((item) => ({
						user: {
							username: item.user.account.username,
							fullName: item.user.fullName,
							avatar: item.user.avatar,
							_id: item.user._id,
						},
						content: item.content,
						time: item.time,
						_id: item._id,
					})),
					time: post.time,
				}))
				.reverse(),
		});
	} catch (error) {
		return res.status(500).json({
			message: "Cannot connect to server",
		});
	}
};

exports.removePost = async (req, res) => {
	const { id } = req.query;
	try {
		const result = await Post.findByIdAndDelete(id);

		// Remove post from user posts
		const user = await User.findById(result.user);
		user.posts = user.posts.filter((item) => item != id);
		await user.save();

		return res.status(200).json({
			message: "Deleted post successfully",
			result: result,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Cannot connect to server",
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
			message: "Liked successfully",
			post: post,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Cannot connect to server",
		});
	}
};

exports.commentPost = async (req, res) => {
	const { id, user, content } = req.body;

	try {
		const post = await Post.findById(id);
		const newComment = new Comment({
			user: user,
			content: content,
			time: new Date().toISOString(),
		});
		const comment = await newComment.save();
		post.comment.push(comment._id);
		await post.save();

		const user$ = await User.findById(user);

		return res.status(200).json({
			message: "Commented successfully",
			comment: {
				user: {
					username: user$.account.username,
					fullName: user$.fullName,
					avatar: user$.avatar,
					_id: user$._id,
				},
				content: content,
				time: new Date().toISOString(),
				_id: comment._id,
			},
		});
	} catch (error) {
		return res.status(500).json({
			message: "Cannot connect to server",
		});
	}
};

exports.removeCommentById = async (req, res) => {
	const { id, commentId } = req.query;

	try {
		const comment = await Comment.findByIdAndDelete(commentId);

		const post = await Post.findById(id);
		post.comment = post.comment.filter((item) => item != commentId);

		await post.save();

		return res.status(200).json({
			message: "Deleted comment successfully",
			comment: comment,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Cannot connect to server",
		});
	}
};

exports.getLatestPost = async (req, res) => {
	try {
		const latest = await Post.find().sort({ time: -1 }).limit(1);
		return res.status(200).json({
			post: latest[0],
		});
	} catch (err) {
		return res.status(500).json({
			messages: "Cannot connect to server",
		});
	}
};

exports.getPostById = async (req, res) => {
	const { id } = req.query;

	try {
		// Chỉ tìm kiếm post theo id và trả ra đúng post đó
		const post = await Post.findById(id).populate("user");
		const commentByPost = await Promise.all(
			post.comment.map(async (item) => {
				const _id = item.toString();
				const comment$ = await Comment.findById(_id).populate("user");
				return comment$;
			})
		);

		// Lấy thông tin comment và tham chiếu sang comment ở post
		post.comment = commentByPost;

		return res.status(200).json({
			post: {
				_id: post._id,
				user: {
					username: post.user.account.username,
					fullName: post.user.fullName,
					avatar: post.user.avatar,
					_id: post.user._id,
				},
				content: post.content,
				images: post.images,
				video: post.video,
				emoji: post.emoji,
				like: post.like,
				comment: post.comment.map((item) => ({
					user: {
						username: item.user.account.username,
						fullName: item.user.fullName,
						avatar: item.user.avatar,
						_id: item.user._id,
					},
					content: item.content,
					time: item.time,
					_id: item._id,
				})),
				time: post.time,
			},
		});
	} catch (error) {
		return res.status(500).json({
			message: "Cannot connect to server",
		});
	}
};
