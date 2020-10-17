module.exports = (sequelize, Sequelize) => {
	const AppUser = sequelize.define('appuser', {
		username: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING
		},
		password: {
			type: Sequelize.STRING
		}
	});

	return AppUser;
};
