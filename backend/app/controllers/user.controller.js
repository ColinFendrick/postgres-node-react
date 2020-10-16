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
	const where = req.query.name ? {
		name: {
			[Op.iLike]: `%${name}%`
		}
	} : null;

	try {
		const users = await User.findAll({ where });
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
		const num = await User.destroy({ where: { id }});
		if (num === 1) {
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

exports.update = async (req, res) => {
	const id = req.params.id;
	console.log(req.body);

	try {
		const num = await User.update(req.body, { where: { id }});
		if (num === 1) {
			res.status(200).send({
				message: `User ${id} updated successfully.`
			});
		} else {
			res.status(500).send({
				message: `Failed to update User at ${id}. User may not have been found.`
			});
		}
	} catch (e) {
		res.status(500).send({
			message: e.message || `Some error occured while updating user ${id}.`
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


const findAllWithInsuranceStatus = hasInsurance => async (req, res) => {
	try {
		const allUsers = await User.findAll({ where: { hasInsurance }});
		res.send(allUsers);
	} catch (e) {
		res.status(500).send({
			message: e.message || 'Some error occurred while retrieving users without insurance.'
		});
	}
};


exports.findAllUninsured = findAllWithInsuranceStatus(false);
exports.findAllWithInsurance = findAllWithInsuranceStatus(true);
