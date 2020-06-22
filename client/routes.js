import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'

import {
  Home,
  Login,
  NotFound,
  Signup,
  SingleRestaurant,
  UserHome,
} from './components'
import {fetchMe} from './store/user'
import {fetchRestaurants} from './store/restaurants'

// ---------- COMPONENT ---------- //
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    return (
      <Switch>
        {/* Routes available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {/* <Route exact path='/restaurants' component={Home} /> */}
        <Route exact path="/:restaurantId" component={SingleRestaurant} />
        <Route exact path="/" component={Home} />
        {isLoggedIn && (
          <Switch>
            {/* Routes only available after logging in */}
            <Route exact path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays Not Found component as a fallback */}
        <Route component={NotFound} />
      </Switch>
    )
  }
}

// ---------- CONTAINER ---------- //

const mapState = (state) => ({
  // Being 'logged in' defined as having a state.user w/ a truthy id
  isLoggedIn: !!state.user.id,
  // restaurants: state.restaurants.restaurants
})

const mapDispatch = (dispatch) => ({
  loadInitialData: () => {
    dispatch(fetchMe())
    dispatch(fetchRestaurants())
  },
})

// `withRouter` wrapper ensures updates aren't blocked when url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

// ---------- PROP TYPES ---------- //

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
