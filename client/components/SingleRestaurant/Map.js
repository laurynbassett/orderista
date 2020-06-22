import React from 'react'
import {Card} from '@material-ui/core'
import {Directions} from '@material-ui/icons'

import {accessToken} from '../access-token'

const Map = (props) => {
  const {restaurant} = props

  return (
    <Card>
      <img
        className="map"
        src={`https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s-restaurant+90a4ae(${restaurant.longitude},${restaurant.latitude})/${restaurant.longitude},${restaurant.latitude},13,0/400x200@2x?access_token=${accessToken}&attribution=false&logo=false`}
        alt="map"
      />
      <div className="address-bar">
        <p className="address">{restaurant.address}</p>
        <a
          href={`http://maps.google.com/maps?saddr&daddr=${restaurant.location.address} ${restaurant.location.city} ${restaurant.location.zipcode}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="directions-bar">
            <Directions /> <span>Get Directions</span>
          </div>
        </a>
      </div>
    </Card>
  )
}

export default Map
