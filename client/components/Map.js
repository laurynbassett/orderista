import React, {useState, useEffect} from 'react'
import ReactMapboxGl, {Layer, Marker, Feature} from 'react-mapbox-gl'
import mapboxgl from 'mapbox-gl'

import {accessToken} from './access-token'
import MapPopup from './MapPopup'

const MapboxGLMap = ReactMapboxGl({accessToken})

const Map = (props) => {
  const [center, setCenter] = useState([-87.6298, 41.8781])
  const [pinRestaurant, setPinRestaurant] = useState([])
  const [zoom, setZoom] = useState([11])
  const [selectedPin, setSelectedPin] = useState(null)

  const {selectedCategory, restaurants} = props

  const handlePinClick = (evt) => {
    const selected = restaurants.find(
      (el) => el.name === evt.feature.properties.name
    )
    setSelectedPin(selected)
    console.log('SELLL', selected)
    setCenter([Number(selected.longitude), Number(selected.latitude)])
    setZoom([12])
    setTimeout(() => {
      setSelectedPin(null)
    }, 5000)
  }
  return (
    <MapboxGLMap
      center={center}
      zoom={zoom}
      style="mapbox://styles/mapbox/light-v10"
      containerStyle={{
        height: '70vh',
        width: '90vw',
      }}
      className="mapContainer"
    >
      {selectedPin && <MapPopup restaurant={selectedPin} />}

      <Layer type="symbol" id="marker" layout={{'icon-image': 'restaurant-15'}}>
        {selectedCategory &&
          restaurants.reduce((a, c, i) => {
            if (
              selectedCategory === 'All' ||
              c.cuisines.includes(selectedCategory)
            ) {
              const props = {
                name: c.name,
                image: c.image,
                cuisine: c.cuisines,
                longitude: c.longitude,
                latitude: c.latitude,
              }
              const marker = (
                <Feature
                  key={i}
                  coordinates={[Number(c.longitude), Number(c.latitude)]}
                  properties={props}
                  onClick={handlePinClick}
                />
              )
              a.push(marker)
            }
            return a
          }, [])}
      </Layer>
    </MapboxGLMap>
  )
}

export default Map
