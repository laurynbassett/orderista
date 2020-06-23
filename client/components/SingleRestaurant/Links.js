import React from 'react'

import {Divider, Paper} from '@material-ui/core'
import {Directions, Launch} from '@material-ui/icons'

const Links = (props) => {
  const {restaurant} = props

  return (
    <Paper variant="outlined">
      <div className="website">
        <Launch />
        <a href={restaurant.url} target="_blank" rel="noopener noreferrer">
          Website
        </a>
      </div>
      <Divider variant="middle" />
      <div className="directions">
        <Directions />
        <a
          href={`http://maps.google.com/maps?saddr&daddr=${restaurant.location.address} ${restaurant.location.city} ${restaurant.location.zipcode}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Directions
        </a>
      </div>
    </Paper>
  )
}

export default Links
