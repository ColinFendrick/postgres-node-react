import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import UserDataService from '../services/UserService';

const User = props => {
	const [hasLoaded, setHasLoaded] = useState(false);

	const { register, handleSubmit, errors, reset, watch } = useForm({
		name: '', email: '', hasInsurance: false, insurance: ''
	});

	const onSubmit = insurance => {
		updateInsurance({
			...watch(['name', 'email', 'id']),
			hasInsurance: true,
			...insurance
		});
	};

	const getUser = id => {
		(async () => {
			try {
				const res = await UserDataService.get(id);
				setHasLoaded(true);
				reset(res.data);
			} catch (e) {
				console.log(e);
			}
		})();
	};

	useEffect(() => getUser(props.match.params.id), [props.match.params.id]);

	const updateInsurance = async data => {
		try {
			const res = await UserDataService.update(data.id, data);
			console.log(res.data);
		} catch (e) {
			console.log(e);
		}
	};

	const username = watch('name');

	return (
		<div>
			{hasLoaded ? (
				<div className='submit-form'>
					<form onSubmit={handleSubmit(onSubmit)}>
						<label htmlFor='insurance'>Insurance</label>
						<input
							type='text'
							className='form-control'
							id='insurance'
							ref={register({ required: true })}
							defaultValue=''
							name='insurance' />
						{errors.insurance && 'Insurance is required'}

						<input type='submit' />
					</form>
					<h4>Name:</h4>
					{username}
				</div>
			) : <div>
					Loading
			</div>}
		</div>
	);
};

export default User;
