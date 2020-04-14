import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { logout } from '../store/user';

// ---------- COMPONENT ---------- //
const Navbar = props => {
	const { handleClick, isLoggedIn } = props;

	return (
		<div>
			<h1>Boilermaker</h1>
			<nav>
				{isLoggedIn ? (
					<div>
						{/* Navbar will show these links after logging in */}
						<Link to='/home'>Home</Link>
						<a href='#' onClick={handleClick}>
							Logout
						</a>
					</div>
				) : (
					<div>
						{/* Navbar will show these links before logging in */}
						<Link to='/login'>Login</Link>
						<Link to='/signup'>Sign Up</Link>
					</div>
				)}
			</nav>
			<hr />
		</div>
	);
};

// ---------- CONTAINER ---------- //
const mapState = state => ({
	isLoggedIn: !!state.user.id
});

const mapDispatch = dispatch => ({
	handleClick: () => dispatch(logout())
});

export default connect(mapState, mapDispatch)(Navbar);

// ---------- PROP TYPES ---------- //
Navbar.propTypes = {
	handleClick: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
};
