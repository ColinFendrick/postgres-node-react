import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthService from '../services/AuthService';
import { passwordRegex, emailRegex } from '../helpers/regex';

const Register = () => {
	const [successful, setSuccessful] = useState(false);
	const [message, setMessage] = useState('');
	const { register, handleSubmit, errors } = useForm({
		username: '', password: '', email: ''
	});

	const handleRegister = async data => {
		setMessage('');
		setSuccessful(false);

		try {
			const res = await AuthService.register(data);
			setMessage(res.data.message);
			setSuccessful(true);
		} catch (e) {
			console.log(e);
			setSuccessful(false);
		}
	};

	return (
		<div className='col-md-12'>
			<div className='card card-container'>

				<form onSubmit={handleSubmit(handleRegister)}>
					{!successful && (
						<div>
							<div className='form-group'>
								<label htmlFor='username'>Username</label>
								<input
									type='text'
									className='form-control'
									name='username'
									id='username'
									ref={register({ required: true, minLength: 3, maxLength: 20 })}
								/>
								{errors.username?.type === 'required' && 'Username is required'}
								{errors.username?.type === 'minLength' && 'Must be at least 3 characters'}
								{errors.usernamne?.type === 'maxLength' && 'Too long!'}
							</div>

							<div className='form-group'>
								<label htmlFor='email'>Email</label>
								<input
									type='email'
									className='form-control'
									name='email'
									id='email'
									ref={register({ required: true, pattern: emailRegex })}
								/>
								{errors.email?.type === 'required' && 'Email is required'}
								{errors.email?.type === 'pattern' && 'Has to be a valid email'}
							</div>

							<div className='form-group'>
								<label htmlFor='passsword'>Password</label>
								<input
									type='password'
									className='form-control'
									name='password'
									id='password'
									ref={register({ required: true, pattern: passwordRegex })}
								/>
								{errors.password?.type === 'required' && 'Your input is required'}
								{errors.password?.type === 'pattern' && 'Must be at least 8 characters, containing one special character'}
							</div>

							<div className="form-group">
								<button
									type='submit'
									className="btn btn-primary btn-block">Sign Up</button>
							</div>
						</div>
					)}

					{message && (
						<div className="form-group">
							<div
								className={ successful ? 'alert alert-success' : 'alert alert-danger' }
								role="alert"
							>
								{message}
							</div>
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default Register;
