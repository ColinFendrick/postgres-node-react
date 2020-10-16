import React, { useState, useEffect } from 'react';
import UserDataService from '../services/UserService';

const Uninsured = () => {
	const [users, setUsers] = useState([]);

	const retrieveUninsured = () => {
		(async () => {
			try {
				const response = await UserDataService.getUninsured();
				setUsers(response.data);
				console.log(response.data);
			} catch (e) {
				console.log(e);
			}
		})();
	};

	useEffect(() => retrieveUninsured(), []);

	return (
		<div>
			{users ? <ul className='list-group'>
				{users.map((user, ix) =>
					<li className='list-group-item' key={ix}>
						{user.name}
					</li>
				)}
			</ul> : <h4>No users found without insurance</h4>}
		</div>
	);
};

export default Uninsured;
