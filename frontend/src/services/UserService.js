import http from '../http-common';

const getAll = () => http.get('/users');

const get = id => http.get(`/users/${id}`);

const create = data => http.post('/users', data);

const update = (id, data) => http.put(`/users/${id}`, data);

const remove = id => http.delete(`/users/${id}`);

const removeAll = () => http.delete('/users');

const getUninsured = () => http.get('/users/uninsured');

const getInsured = () => http.get('/users/insured');

export default {
	getAll,
	get,
	create,
	update,
	remove,
	removeAll,
	getUninsured,
	getInsured
};
