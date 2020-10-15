const db = require('../models');
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
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

	try {
		const response = await User.create(user);
		res.status(200).send(response);
	} catch (e) {
		res.status(500).send({
			message: e.message || 'Some error occurred while creating the Userds.'
		});
	}
};

exports.findAll = async (req, res) => {
	try {
		const users = await User.findAll();
		res.status(200).send(users);
	} catch (e) {
		res.status(500).send({
			message: e.message || 'Cannot retrieve users'
		});
	}
};

exports.findOne = async (req, res) => {
	const id = req.params.id;

	try {
		const user = await User.findByPk(id);
		res.status(200).send(user);
	} catch (e) {
		res.status(500).send({
			message: `Error retrieving User with id=${id}`
		});
	}
};

exports.delete = async (req, res) => {
	const id = req.params.id;

	try {
		const result = await User.destroy({ where: { id }});
		if (result === 1) {
			res.status(200).send({ message: 'User destroyed' });
		} else {
			res.status(500).send({ message: `Failed to delete user with ${id}` });
		}
	} catch (e) {
		res.status(500).send({
			message: `Could not delete User with id=${id}`
		});
	}
};

exports.deleteAll = async (req, res) => {
	try {
		const result = await User.destroy({
			where: {}, truncate: false
		});
		res.status(200).send({
			message: `${result} Users destroyed`
		});
	} catch (e) {
		res.status(500).send({
			message: e.message || 'Some error occurred while removing all users.'
		});
	}
};
