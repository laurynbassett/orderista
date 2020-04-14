import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import { UserHome, Signup, Login } from './components';
import { fetchMe } from './store/user';

// ---------- COMPONENT ---------- //
class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData();
	}

	render() {
		const { isLoggedIn } = this.props;

		return (
			<Switch>
				{/* Routes available to all visitors */}
				<Route path='/login' component={Login} />
				<Route path='/signup' component={Signup} />
				{isLoggedIn && (
					<Switch>
						{/* Routes only available after logging in */}
						<Route path='/home' component={UserHome} />
					</Switch>
				)}
				{/* Displays Login component as a fallback */}
				<Route component={Login} />
			</Switch>
		);
	}
}

// ---------- CONTAINER ---------- //

const mapState = state => ({
	// Being 'logged in' defined as having a state.user w/ a truthy id
	isLoggedIn: !!state.user.id
});

const mapDispatch = dispatch => ({
	loadInitialData: () => dispatch(fetchMe())
});

// `withRouter` wrapper ensures updates aren't blocked when url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

// ---------- PROP TYPES ---------- //

Routes.propTypes = {
	loadInitialData: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
};
