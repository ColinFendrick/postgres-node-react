const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = require('../models');
const config = require('../config/auth.config');
const AppUser = db.appusers;

exports.signup = async (req, res) => {
	try {
		const appuser = await AppUser.create({
			username: req.body.username,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 8)
		});
		res.status(200).send({ message: `User ${appuser.username} created` });
	} catch (e) {
		res.status(500).send({ message: e.message });
	}
};

exports.signin = async (req, res) => {
	try {
		const appuser = await AppUser.findOne({
			where: {
				username: req.body.username
			}
		});

		if (!appuser) {
			return res.status(404).send({
				message: 'User Not found.'
			});
		}

		const passwordIsValid = bcrypt.compareSync(
			req.body.password,
			appuser.password
		);

		if (!passwordIsValid) {
			return res.status(401).send({
				accessToken: null,
				message: 'Invalid Password!'
			});
		}

		const token = jwt.sign({ id: appuser.id }, config.secret, {
			expiresIn: 86400 // 24 hours
		});

		res.status(200).send({
			id: appuser.id,
			username: appuser.username,
			email: appuser.email,
			accessToken: token
		});
	} catch (e) {
		res.status(500).send({ message: e.message });
	}
};



