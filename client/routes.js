import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Route, Switch, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'

import {Home, Login, Signup, SingleRestaurant, UserHome} from './components'
import {fetchMe} from './store/user'
import {fetchRestaurants} from './store/restaurants'

// ---------- COMPONENT ---------- //
const Routes = (props) => {
  const {loadInitialData, isLoggedIn} = props

  const [loginStatus, setLoginStatus] = useState(false)

  useEffect(() => {
    loadInitialData()
  }, [loginStatus])

  return (
    <Switch>
      {/* Routes available to all visitors */}
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/restaurants/:restaurantId" component={SingleRestaurant} />
      {isLoggedIn && (
        <Switch>
          {/* Routes only available after logging in */}
          <Route path="/home" component={UserHome} />
        </Switch>
      )}
      {/* Displays Login component as a fallback */}
      <Route path="/" component={Home} />
    </Switch>
  )
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
  },
})

// `withRouter` wrapper ensures updates aren't blocked when url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

// ---------- PROP TYPES ---------- //

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
