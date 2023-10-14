/** @format */

const User = require("../Model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signToken = (user) => {
	return (
		"Bearer " +
		jwt.sign(
			{
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
				account: {
					username: user.account.username,
				},
				work: {
					company: user.work.company,
					position: user.work.position,
				},
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
				message: "Account does not exist",
			});
		}
		const isMatch = await bcrypt.compare(password, user.account.password);
		if (!isMatch) {
			return res.status(400).json({
				message: "Password is incorrect",
			});
		}
		const token = signToken(user);
		return res.status(200).json({
			resultCd: 0,
			username: user.account.username,
			token: token,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Cannot connect to server",
		});
	}
};

exports.register = async (req, res) => {
	const { username, password } = req.body;

	try {
		// Kiểm tra tài khoản đã tồn tại chưa
		const user = await User.findOne({ "account.username": username });
		if (user) {
			return res.status(400).json({
				message: "Account already exists",
			});
		}
		// Mã hóa mật khẩu
		const salt = await bcrypt.genSalt(12);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Tạo tài khoản mới
		const newUser = new User({
			fullName: "BareFans@" + username,
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
		return res.status(500).json({
			message: "Cannot connect to server",
		});
	}
};

exports.updateProfile = async (req, res) => {
	const { username } = req.query;
	const {
		fullName,
		birthday,
		bio,
		avatar,
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
				message: "Account does not exist",
			});
		}
		user.fullName = fullName;
		user.birthday = birthday;
		user.bio = bio;
		user.avatar = avatar;
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
			message: "Update profile successfully",
		});
	} catch (error) {
		return res.status(500).json({
			message: "Cannot connect to server",
		});
	}
};
