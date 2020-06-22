import React from 'react'
import {Link} from 'react-router-dom'

const NotFound = () => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404" />
        <h1>404</h1>
        <h2>Oops! Page Not Be Found</h2>
        <p>Sorry, the page you are looking for does not exist!</p>
        <Link to="/">Go Home</Link>
      </div>
    </div>
  )
}

export default NotFound
