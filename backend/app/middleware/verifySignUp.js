const db = require('../models');
const AppUser = db.appusers;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
	try {
		const appuserByUsername = await AppUser.findOne({ where: { username: req.body.username }});
		if (appuserByUsername) {
			res.status(400).send({
				message: 'Failed! Username is already in use!'
			});
			return;
		}

		const appuserByEmail = await AppUser.findOne({ where: { email: req.body.email }});
		if (appuserByEmail) {
			res.status(400).send({
				message: 'Failed! Email is already in use!'
			});
			return;
		}

		next();
	} catch (e) {
		res.status(500).send({
			message:  `Something when wrong trying to verify fresh username/email: ${e}`
		});
	}
};

module.exports = {
	checkDuplicateUsernameOrEmail
};
