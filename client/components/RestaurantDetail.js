import React from 'react'
import {connect} from 'react-redux'

const RestaurantDetail = (props) => {
  // const { state } = props.location;
  console.log('DETAIL', props.selected)
  // console.log('RESTAURANT', state);

  return <p>HELLO</p>
}

const mapState = (state) => ({
  selected: state.restaurants.selectedRestaurant,
})

export default connect(mapState)(RestaurantDetail)
