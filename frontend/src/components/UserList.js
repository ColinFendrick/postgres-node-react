import React, { useState, useEffect } from 'react';
import UserDataService from '../services/UserService';

const UserList = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => retrieveUsers(), []);

	const retrieveUsers = () => {
		(async () => {
			try {
				const response = await UserDataService.getAll();
				setUsers(response.data);
				console.log(response.data);
			} catch (e) {
				console.log(e);
			}
		})();
	};

	return (
		<ul className='list-group'>
			{users && users.map((user, index) => <li
				className={'list-group-item'}
				key={index}>
				{user.name}
			</li>
			)}
		</ul>
	);
};

export default UserList;
