import http from '../http-common';

const getAll = () => http.get('/users');

// const get = id => {
//   return http.get(`/users/${id}`);
// };

const create = data => http.post('/users', data);

// const update = (id, data) => {
//   return http.put(`/users/${id}`, data);
// };

const remove = id => http.delete(`/users/${id}`);

const removeAll = () => http.delete('/users');

// const findByTitle = title => {
//   return http.get(`/users?title=${title}`);
// };

export default {
	getAll,
	// get,
	create,
	// update,
	remove,
	removeAll,
	// findByTitle
};
