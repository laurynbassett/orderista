import React from 'react'
import {Link} from 'react-router-dom'
import {Popup} from 'react-mapbox-gl'

const MapPopup = (props) => {
  const {restaurant} = props
  return (
    <Popup
      coordinates={[restaurant.longitude, restaurant.latitude]}
      anchor="bottom"
      offset={[0, -15]}
      closeButton={false}
      closeOnClick={true}
    >
      <div>
        {restaurant.image && <img src={restaurant.image} />}
        <div>
          {restaurant.name}
          <br />
          <Link to="/detail">view details</Link>
        </div>
      </div>
    </Popup>
  )
}

export default MapPopup
