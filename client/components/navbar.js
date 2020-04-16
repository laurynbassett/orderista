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
      <div>
        <h1>GOFood</h1>
      </div>
      <div>
        <Link to="/home">Home</Link>
        <a href="#" onClick={handleClick}>
          Logout
        </a>
      </div>
    </nav>
  ) : (
    <nav>
      <div>
        <h1>GOFood</h1>
      </div>
      <div>
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
