const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
	// Validate request
	if (!req.body.name) {
		res.status(400).send({
			message: 'Name is required'
		});
		return;
	}

	if (!req.body.email) {
		res.status(400).send({
			message: 'Email is required'
		});
		return;
	}

	const user = {
		name: req.body.name,
		email: req.body.email,
		hasInsurance: req.body.hasInsurance ? req.body.hasInsurance : false
	};

	User.create(user)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || 'Some error occurred while creating the Userds.'
			});
		});
};

exports.findAll = (req, res) => {
	User.findAll()
		.then(data => res.send(data))
		.catch(err => {
			res.status(500).send({
				message: err.message || 'Cannot retrieve users'
			});
		});
};
