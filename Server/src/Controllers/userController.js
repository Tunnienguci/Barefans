/** @format */

const User = require("../Model/user");

exports.getUser = async (req, res) => {
	const { username } = req.query;
	const user = await User.findOne({ "account.username": username });
	if (user) {
		return res.status(200).json({
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
		});
	}
};
