module.exports = app => {
	const users = require('../controllers/user.controller.js');

	const router = require('express').Router();

	router.post('/', users.create);

	router.get('/', users.findAll);

	router.get('/uninsured', users.findAllUninsured);

	router.get('/insured', users.findAllWithInsurance);

	router.get('/:id', users.findOne);

	router.put('/:id', users.update);

	router.delete('/:id', users.delete);

	router.delete('/', users.deleteAll);

	app.use('/api/users', router);
};
