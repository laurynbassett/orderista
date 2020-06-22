import React, {Fragment} from 'react'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'

const RestaurantListItem = (props) => {
  const {restaurant, handleClick} = props
  return (
    <Fragment>
      <Divider />
      <ListItem
        key={restaurant.id}
        onClick={() => handleClick(restaurant)}
        name={restaurant.name}
        value={restaurant.name}
      >
        <div className="row">
          <div className="product-detail">
            {restaurant.image && (
              <img src={restaurant.image} className="image" />
            )}

            <div className="text">
              <div className="name">{restaurant.name}</div>
              <div className="address">{restaurant.address}</div>
            </div>
          </div>
        </div>
      </ListItem>
    </Fragment>
  )
}

export default RestaurantListItem
