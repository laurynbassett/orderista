import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'

import {Home, Login, MapPopup, Signup, UserHome} from './components'
import {fetchMe} from './store/user'

// ---------- COMPONENT ---------- //
const Routes = ({isLoggedIn, dispatch}) => {
  useEffect(() => {
    dispatch(fetchMe())
  })

  return (
    <Switch>
      {/* Routes available to all visitors */}
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/detail" component={MapPopup} />
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
})

// `withRouter` wrapper ensures updates aren't blocked when url changes
export default withRouter(connect(mapState)(Routes))

// ---------- PROP TYPES ---------- //

Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
}
