import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserDataService from '../services/UserService';

const UserList = () => {
	const [users, setUsers] = useState([]);
	const [currentUser, setCurrentUser] = useState(null);
	const [currentIndex, setCurrentIndex] = useState(-1);

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

	const setActiveUser = (user, index) => {
		setCurrentUser(user);
		setCurrentIndex(index);
	};

	const refreshList = () => {
		retrieveUsers();
		setCurrentUser(null);
		setCurrentIndex(-1);
	};

	const removeAllUsers = async () => {
		try {
			const res = await UserDataService.removeAll();
			console.log(res.data);
			refreshList();
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div>
			<ul className='list-group'>
				{users && users.map((user, index) => <li
					className={`list-group-item ${index === currentIndex ? 'active' : ''}`}
					onClick={() => setActiveUser(user, index)}
					key={index}>
					{user.name}
				</li>
				)}
			</ul>
			<button
				className='m-3 btn btn-sm btn-danger'
				onClick={removeAllUsers}
			>
        Remove All
			</button>
			{currentUser ? (
				<div>
					<h4>User</h4>
					<div>
						<label>
							<strong>Name:</strong>
						</label>{' '}
						{currentUser.name}
					</div>

					<div>
						<label>
							<strong>Email:</strong>
						</label>{' '}
						{currentUser.email}
					</div>

					<div>
						<label>
							<strong>Has Insurance:</strong>
						</label>{' '}
						{currentUser.hasInsurance ? currentUser.insurance : 'No'}
					</div>

					<Link
						to={`/users/${currentUser.id}`}
						className='badge badge-warning'
					>
            Edit
					</Link>
				</div>
			) : ''}
		</div>
	);
};

export default UserList;
