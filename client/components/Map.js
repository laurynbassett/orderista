import React, {useState, useEffect} from 'react'
import {connect, useSelector} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ReactMapboxGl, {Layer, Feature} from 'react-mapbox-gl'

import {accessToken} from './access-token'
import MapPopup from './MapPopup'

import {setRestaurant} from '../store/restaurants'

const MapboxGLMap = ReactMapboxGl({accessToken})

const Map = (props) => {
  const {
    executeScroll,
    restaurants,
    setSelectedRestaurant,
    selectedCategory,
  } = props

  const selectedRestaurant = useSelector(
    (state) => state.restaurants.selectedRestaurant
  )

  const [center, setCenter] = useState([-87.6298, 41.8781])
  const [zoom, setZoom] = useState([11])

  useEffect(() => {
    if (Object.keys(selectedRestaurant).length > 0) {
      setCenter([
        Number(selectedRestaurant.longitude),
        Number(selectedRestaurant.latitude),
      ])
      setZoom([12])
    }
  }, [selectedRestaurant])

  const handlePinClick = (evt) => {
    const selected = restaurants.find(
      (el) => el.name === evt.feature.properties.name
    )
    setSelectedRestaurant(selected)
    setCenter([Number(selected.longitude), Number(selected.latitude)])
    setZoom([12])
  }

  return (
    <MapboxGLMap
      center={center}
      zoom={zoom}
      // eslint-disable-next-line react/style-prop-object
      style="mapbox://styles/mapbox/light-v10"
      containerStyle={{
        height: '70vh',
        width: '90vw',
      }}
      className="mapContainer"
    >
      {selectedRestaurant && <MapPopup executeScroll={executeScroll} />}

      <Layer type="symbol" id="marker" layout={{'icon-image': 'restaurant-15'}}>
        {selectedCategory &&
          restaurants.reduce((a, c) => {
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
                  key={c.id}
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

const mapState = (state) => ({
  restaurants: state.restaurants.restaurants,
  // selectedRestaurant: state.restaurants.selectedRestaurant,
  selectedCategory: state.restaurants.selectedCategory,
})

const mapDispatch = (dispatch) => ({
  setSelectedRestaurant: (selected) => dispatch(setRestaurant(selected)),
})
export default withRouter(connect(mapState, mapDispatch)(Map))
