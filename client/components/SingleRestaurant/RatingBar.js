import React from 'react'
import {Box} from '@material-ui/core'
import {Rating} from '@material-ui/lab'

const RatingBar = (props) => {
  const {restaurant} = props

  return (
    <div className="rating">
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Rating
          name="read-only"
          value={
            restaurant.user_rating &&
            Number(restaurant.user_rating.aggregate_rating)
          }
          readOnly
        />
      </Box>
      <p>{Number(restaurant.user_rating.votes)} reviews</p>
    </div>
  )
}

export default RatingBar
