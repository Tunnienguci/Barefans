/** @format */

const User = require("../Model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signToken = (user) => {
	return (
		"Bearer " +
		jwt.sign(
			{
				_id: user._id,
				username: user.account.username,
				fullName: user.fullName,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "1d",
			}
		)
	);
};

exports.login = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({ "account.username": username });
		if (!user) {
			return res.status(400).json({
				message: "Tài khoản không tồn tại",
			});
		}
		const isMatch = await bcrypt.compare(password, user.account.password);
		if (!isMatch) {
			return res.status(400).json({
				message: "Mật khẩu không chính xác",
			});
		}
		const token = signToken(user);
		return res.status(200).json({
			resultCd: 0,
			username: user.account.username,
			token: token,
		});
	} catch (error) {
		console.error("Lỗi server:", error);
		return res.status(500).json({
			message: "Lỗi server",
		});
	}
};

exports.register = async (req, res) => {
	const { fullName, username, password } = req.body;

	try {
		// Kiểm tra tài khoản đã tồn tại chưa
		const user = await User.findOne({ "account.username": username });
		if (user) {
			return res.status(400).json({
				message: "Tài khoản đã tồn tại",
			});
		}
		// Mã hóa mật khẩu
		const salt = await bcrypt.genSalt(12);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Tạo tài khoản mới
		const newUser = new User({
			fullName,
			account: {
				username,
				password: hashedPassword,
			},
		});

		await newUser.save();

		return res.status(200).json({
			resultCd: 0,
			username: newUser.account.username,
		});
	} catch (error) {
		console.error("Lỗi server:", error);
		return res.status(500).json({
			message: "Lỗi server",
		});
	}
};

exports.getMyUser = async (req, res) => {
	const { username } = req.query;

	// Lấy thông tin user
	const data = await User.findOne({ "account.username": username });

	try {
		return res.status(200).json({
			resultCd: 0,
			user: {
				username: data.account.username,
				fullName: data.fullName,
				birthday: data.birthday,
				avatar: data.avatar,
				bio: data.bio,
				hometown: data.hometown,
				live: data.live,
				relationship: data.relationship,
				facebook: data.facebook,
				twitter: data.twitter,
				instagram: data.instagram,
				linkedin: data.linkedin,
				highSchool: data.highSchool,
				secondarySchool: data.secondarySchool,
				college: data.college,
				posts: data.posts,
				university: data.university,
				albums: data.albums,
				friends: data.friends,
				requests: data.requests,
				verify: data.verify,
				_id: data._id,
			},
		});
	} catch (error) {
		console.error("Lỗi server:", error);
		return res.status(500).json({
			message: "Lỗi server",
		});
	}
};

exports.updateProfile = async (req, res) => {
	const { username } = req.query;
	const {
		fullName,
		birthday,
		avatar,
		bio,
		hometown,
		live,
		relationship,
		facebook,
		twitter,
		instagram,
		linkedin,
		highSchool,
		secondarySchool,
		college,
		university,
	} = req.body;

	try {
		const user = await User.findOne({ "account.username": username });
		if (!user) {
			return res.status(400).json({
				message: "Tài khoản không tồn tại",
			});
		}
		user.fullName = fullName;
		user.birthday = birthday;
		user.avatar = avatar;
		user.bio = bio;
		user.hometown = hometown;
		user.live = live;
		user.relationship = relationship;
		user.facebook = facebook;
		user.twitter = twitter;
		user.instagram = instagram;
		user.linkedin = linkedin;
		user.highSchool = highSchool;
		user.secondarySchool = secondarySchool;
		user.college = college;
		user.university = university;

		await user.save();

		return res.status(200).json({
			resultCd: 0,
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
		});
	} catch (error) {
		console.error("Lỗi server:", error);
		return res.status(500).json({
			message: "Lỗi server",
		});
	}
};
