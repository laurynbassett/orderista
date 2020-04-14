import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { auth } from '../store';

// ---------- COMPONENT ---------- //
const AuthForm = props => {
	const { name, method, handleSubmit, err } = props;

	return (
		<div>
			<form onSubmit={handleSubmit} name={method}>
				<div className='flex column'>
					<div className='flex column m1'>
						<label htmlFor='email'>Email</label>
						<input name='email' type='text' className='input' />
					</div>
					<div className='flex column m1'>
						<label htmlFor='password'>Password</label>
						<input name='password' type='password' className='input' />
					</div>
					<div className='m1'>
						<button type='submit' className='btn'>
							{name}
						</button>
					</div>
					{err && err.response && <div> {err.response.data} </div>}
				</div>
			</form>
			<a href='/auth/google'>{name} with Google</a>
		</div>
	);
};

// ---------- CONTAINER ---------- //
const mapLogin = state => ({
	name: 'Login',
	method: 'login',
	err: state.user.error
});

const mapSignup = state => ({
	name: 'Sign Up',
	method: 'signup',
	err: state.user.error
});

const mapDispatch = dispatch => ({
	handleSubmit(evt) {
		evt.preventDefault();
		// trigger thunk (AJAX login request)
		const method = evt.target.name;
		const email = evt.target.email.value;
		const password = evt.target.password.value;
		dispatch(auth(email, password, method));
	}
});

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

// ---------- PROP TYPES ---------- //
AuthForm.propTypes = {
	name: PropTypes.string.isRequired,
	method: PropTypes.string.isRequired,
	handleSubmit: PropTypes.func.isRequired,
	err: PropTypes.object
};
