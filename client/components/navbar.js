import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import {logout} from '../store/user'

// ---------- COMPONENT ---------- //
const Navbar = (props) => {
  const {handleClick, isLoggedIn} = props
  const loginInfo = isLoggedIn ? (
    <nav>
      <div className="nav-col-1">
        <img className="nav-icon" src="logo.png" />
        <Link to="/">
          <h1>Orderista</h1>
        </Link>
      </div>
      <div className="nav-col-2">
        <Link to="/home">Home</Link>
        <a href="#" onClick={handleClick}>
          Logout
        </a>
      </div>
    </nav>
  ) : (
    <nav>
      <div className="nav-col-1">
        <img className="nav-icon" src="logo.png" />
        <Link to="/">
          <h1>Orderista</h1>
        </Link>
      </div>
      <div className="nav-col-2">
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </nav>
  )

  return (
    <div>
      {loginInfo}
      <hr />
    </div>
  )
}

// ---------- CONTAINER ---------- //
const mapState = (state) => ({
  isLoggedIn: !!state.user.id,
})

const mapDispatch = (dispatch) => ({
  handleClick: () => dispatch(logout()),
})

export default connect(mapState, mapDispatch)(Navbar)

// ---------- PROP TYPES ---------- //
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
