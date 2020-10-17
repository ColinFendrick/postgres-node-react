import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthService from '../services/AuthService';
import { passwordRegex } from '../helpers/regex';

const Login = props => {
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');
	const { register, handleSubmit, errors } = useForm({
		username: '', password: ''
	});

	const handleLogin = async data => {
		setMessage('');
		setLoading(true);

		try {
			const res = await AuthService.login(data);
			if (res.status === 404) {
				setMessage(res.data.message);
				setLoading(false);
				return;
			} else {
				props.history.push('/tutorials');
				window.location.reload();
			}
		} catch (e) {
			const resMessage = e.response.data.message.toString() || 'An error has occured';
			setLoading(false);
			setMessage(resMessage);
		}
	};

	return (
		<div className='col-md-12'>
			<div className='card card-container'>

				<form onSubmit={handleSubmit(handleLogin)}>

					<div className='form-group'>
						<label htmlFor='username'>Username</label>
						<input
							type='text'
							className='form-control'
							id='username'
							ref={register({ required: true })}
							defaultValue=''
							name='username' />
						{errors.username && 'Username is required'}
					</div>

					<div className='form-group'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							className='form-control'
							id='password'
							ref={register({ required: true, pattern: passwordRegex })}
							defaultValue=''
							name='password' />
						{errors.password?.type === 'required' && 'Your input is required'}
						{errors.multipleErrorInput?.type === 'pattern' && 'Must be at least 8 characters, containing one special character'}
					</div>

					<div className='form-group'>
						<button
							className='btn btn-primary btn-block'
							disabled={loading}
							type='submit'>
							{loading && (
								<span className='spinner-border spinner-border-sm'></span>
							)}
							<span>Login</span>
						</button>
					</div>

					{message && (
						<div className='form-group'>
							<div className='alert alert-danger' role='alert'>
								{message}
							</div>
						</div>
					)}

				</form>
			</div>
		</div>
	);
};

export default Login;
