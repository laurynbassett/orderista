import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'

import {Divider} from '@material-ui/core'

import {fetchRestaurant} from '../../store/restaurants'
import ButtonBar from './ButtonBar'
import Cuisines from './Cuisines'
import Highlights from './Highlights'
import Links from './Links'
import Map from './Map'
import PhotoGrid from './PhotoGrid'
import RatingBar from './RatingBar'

const SingleRestaurant = (props) => {
  const {singleRestaurant, restaurants} = props
  const [restaurant, setRestaurant] = useState({})
  console.log('PROPS MATCH PARAMS', props.match.params)

  useEffect(() => {
    console.log('IN USE EFFECT', restaurants)
    console.log('PROPS MATCH PARAMS', props.match.params)
    if (restaurants) {
      setRestaurant(
        restaurants.find((r) => +r.id === +props.match.params.restaurantId)
      )
    } else {
      fetchRestaurant(props.match.params.restaurantId)
      console.log('USE EFFECT FETCHED PROP', singleRestaurant)
      setRestaurant(singleRestaurant)
    }
  }, [restaurant.id])

  console.log('LOCAL STATE RESTAURANT', restaurant)

  if (Object.keys(restaurant).length > 0) {
    return (
      <div className="single-restaurant">
        <div className="row-1">
          {restaurant.photos.length > 0 && (
            <PhotoGrid restaurant={restaurant} />
          )}
        </div>
        <div className="row-2 container">
          <div className="column-1 box">
            <div className="row-1">
              <div className="name">
                <h2>{restaurant.name}</h2>
              </div>
              <RatingBar restaurant={restaurant} />
              <Cuisines restaurant={restaurant} />
              <ButtonBar restaurant={restaurant} />
            </div>
            <Divider />
            <div className="location">
              <h4>Location & Hours</h4>
              <div>
                <Map restaurant={restaurant} />

                <div className="hours">
                  <p>
                    <span className="title">Hours: </span>
                    {restaurant.timings.split(', ').join('\n')}
                  </p>
                </div>
              </div>
            </div>
            <Divider />
            <Highlights restaurant={restaurant} />
          </div>
          <div className="column-2 box">
            <Links restaurant={restaurant} />
          </div>
        </div>
      </div>
    )
  } else return null
}

const mapState = (state) => ({
  singleRestaurant: state.restaurants.selectedRestaurant,
  restaurants: state.restaurants.restaurants,
})

const mapDispatch = (dispatch) => ({
  fetchRestaurant: (id) => dispatch(fetchRestaurant(id)),
})

export default connect(mapState, mapDispatch)(SingleRestaurant)
