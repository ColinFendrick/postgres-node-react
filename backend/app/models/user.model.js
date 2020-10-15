module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('tutorial', {
		name: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING
		},
		hasInsurance: {
			type: Sequelize.BOOLEAN
		}
	});

	return User;
};
