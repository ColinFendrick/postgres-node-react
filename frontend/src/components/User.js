import React, { useState, useEffect } from 'react';
import UserDataService from '../services/UserService';

const User = props => {
	const initialUserState = {
		name: '', email: '', hasInsurance: false, insurance: ''
	};
	const [currentUser, setCurrentUser] = useState(initialUserState);

	const getUser = id => {
		(async () => {
			try {
				const res = await UserDataService.get(id);
				setCurrentUser(res.data);
			} catch (e) {
				console.log(e);
			}
		})();
	};

	useEffect(() => getUser(props.match.params.id), [props.match.params.id]);

	const updateInsurance = async () => {
		try {
			const res = await UserDataService.update(currentUser.id, currentUser);
			console.log(res.data);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div>
			{currentUser ? (
				<div>
					{currentUser.name}
				</div>
			) : <div>
					No current user found!
			</div>}
		</div>
	);
};

export default User;
