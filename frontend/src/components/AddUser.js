import React from 'react';
import { useForm } from 'react-hook-form';
import UserDataService from '../services/UserService';
import { emailRegex } from '../helpers/regex';

const AddUser = () => {
	const {
		register,
		handleSubmit,
		errors
	} = useForm();

	const onSubmit = async data => {
		try {
			const response = await UserDataService.create(data);
			console.log(response);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div className='submit-form'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor='name'>Name:</label>
				<input
					type='text'
					className='form-control'
					id='userName'
					ref={register({ required: true })}
					defaultValue=''
					name='name'
				/>
				{errors.name && 'Name is required'}
				<label htmlFor='email'>Email:</label>
				<input
					type='text'
					className='form-control'
					id='userEmail'
					ref={register({ required: true, pattern: emailRegex })}
					defaultValue={''}
					name='email'
				/>
				{errors.email && 'Invalid email'}
				<input type='submit' />
			</form>
		</div>
	);
};

export default AddUser;
