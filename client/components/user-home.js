import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// ---------- COMPONENT ---------- //
export const UserHome = props => {
	const { user } = props;

	return (
		<div>
			<h3>Welcome back, {user.email}</h3>
		</div>
	);
};

// ---------- CONTAINER ---------- //
const mapState = state => ({
	user: state.user
});

export default connect(mapState)(UserHome);

// ---------- PROP TYPES ---------- //
UserHome.propTypes = {
	email: PropTypes.string
};
