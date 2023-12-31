/** @format */

const User = require("../Model/user");

exports.getUser = async (req, res) => {
	const { username } = req.query;
	const user = await User.findOne({ "account.username": username });
	if (user) {
		return res.status(200).json({
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
		});
	}
};

exports.followUser = async (req, res) => {
	const { sendId } = req.query;
	const { receiveId } = req.body;

	try {
		const sendReq = await User.findById(sendId);
		const recReq = await User.findById(receiveId);

		// Thêm request vào danh sách request
		sendReq.requests.push({
			sendRequest: recReq._id,
			receiveRequest: sendReq._id,
		});
		recReq.requests.push({
			sendRequest: recReq._id,
			receiveRequest: sendReq._id,
		});

		await sendReq.save();
		await recReq.save();

		return res.status(200).json({
			message: "Requested to follow successfully",
			status: 2,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Can not follow this user, please try again",
			error: error.message,
		});
	}
};

exports.getReceiveRequest = async (req, res) => {
	const { id } = req.query;

	const myAccount = await User.findById(id);
	const receiveRequest = [];

	await Promise.all(
		myAccount.requests.map(async (item) => {
			const _id = item.receiveRequest.toString();
			if (myAccount._id == item.sendRequest.toString()) {
				const user$ = await User.findById(_id);
				receiveRequest.push(user$);
			}
		})
	);

	return res.status(200).json(
		receiveRequest.map((item) => {
			return {
				fullName: item.fullName,
				avatar: item.avatar,
				username: item.account.username,
			};
		})
	);
};

exports.rejectFollow = async (req, res) => {
	const { username, reqname } = req.query;

	// Tìm user
	const userRec = await User.findOne({ "account.username": username });
	const userReq = await User.findOne({ "account.username": reqname });

	try {
		// Xóa request
		userRec.requests = userRec.requests.filter(
			(item) => item.receiveRequest.toString() !== userReq._id.toString()
		);
		userReq.requests = userReq.requests.filter(
			(item) => item.sendRequest.toString() !== userRec._id.toString()
		);

		await userRec.save();
		await userReq.save();

		return res.status(200).json({
			message: "Rejected request successfully",
		});
	} catch (error) {
		return res.status(500).json({
			message: "Can not reject this request, please try again",
			error: error.message,
		});
	}
};

exports.acceptFollow = async (req, res) => {
	const { username } = req.query;
	const { usernameAccept } = req.body;

	// Tạo request kết bạn
	sendReq = await User.findOne({ "account.username": username });
	recReq = await User.findOne({ "account.username": usernameAccept });

	try {
		// Nếu đã kết bạn thì không thực hiện
		if (sendReq.friends.includes(recReq._id)) {
			return res.status(200).json({
				message: "Both of you are friends",
			});
		} else {
			// Thêm friend
			sendReq.friends.push(recReq._id);
			recReq.friends.push(sendReq._id);
		}

		// Xóa request
		sendReq.requests = sendReq.requests.filter(
			(item) => item.receiveRequest.toString() !== recReq._id.toString()
		);
		recReq.requests = recReq.requests.filter(
			(item) => item.sendRequest.toString() !== sendReq._id.toString()
		);

		await sendReq.save();
		await recReq.save();

		return res.status(200).json({
			message: "Accepted request successfully",
		});
	} catch (error) {
		return res.status(500).json({
			message: "Can not accept this request, please try again",
			error: error.message,
		});
	}
};

exports.getFriends = async (req, res) => {
	const { username } = req.query;

	const user = await User.findOne({ "account.username": username });

	try {
		const friends = await Promise.all(
			user.friends.map(async (item) => {
				const _id = item.toString();
				const user$ = await User.findById(_id);
				return {
					fullName: user$.fullName,
					avatar: user$.avatar,
					username: user$.account.username,
					id: user$._id,
				};
			})
		);

		return res.status(200).json({
			friends: friends,
		});
	} catch (err) {
		return res.status(500).json({
			message: "Can not get friends, please try again",
			error: err.message,
		});
	}
};

exports.updateAvatar = async (req, res) => {
	const { id, path } = req.body;

	const user = await User.findById(id);
	user.avatar = path;

	try {
		await user.save();
		return res.status(200).json({
			message: "Updated avatar successfully",
			path: path,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Can not update avatar, please try again",
			error: error.message,
		});
	}
};

exports.updateProfile = async (req, res) => {
	const { username } = req.query;
	const {
		fullName,
		birthday,
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
		work,
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
		user.work = {
			company: work.company,
			position: work.position,
		};

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

exports.updateBio = async (req, res) => {
	const { bio, id } = req.body;

	try {
		const user = await User.findById(id);
		user.bio = bio;
		await user.save();
		return res.status(200).json({
			message: "Updated bio successfully",
			bio: bio,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Can not update bio, please try again",
			error: error.message,
		});
	}
};
