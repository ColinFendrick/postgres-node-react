import React, { useState, useEffect } from 'react';
import UserDataService from '../services/UserService';

const Insured = () => {
	const [users, setUsers] = useState([]);

	const retrieveInsured = () => {
		(async () => {
			try {
				const response = await UserDataService.getInsured();
				setUsers(response.data);
				console.log(response.data);
			} catch (e) {
				console.log(e);
			}
		})();
	};

	useEffect(() => retrieveInsured(), []);

	return (
		<div>
			{users ? <ul className='list-group'>
				{users.map((user, ix) =>
					<li className='list-group-item' key={ix}>
						{user.name}
					</li>
				)}
			</ul> : <h4>No users found with insurance</h4>}
		</div>
	);
};

export default Insured;
