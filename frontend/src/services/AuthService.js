import http from '../http-common';

const register = ({ username, email, password }) => http.post('/auth/signup', {
	username,
	email,
	password,
});

const login = async ({ username, password }) => {
	try {
		const response = await http.post('/auth/signin', {
			username,
			password,
		});
		if (response.data.accessToken) {
			localStorage.setItem('user', JSON.stringify(response.data));
		}
		return response;
	} catch (e) {
		return e.response;
	}
};

const logout = () => localStorage.removeItem('user');

const getCurrentUser = () => JSON.parse(localStorage.getItem('user'));

export default {
	register,
	login,
	logout,
	getCurrentUser,
};
