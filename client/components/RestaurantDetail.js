import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {makeStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

import {setRestaurant} from '../store'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}))

const RestaurantDetail = (props) => {
  const {clearSelected, refProp, restaurant} = props
  const classes = useStyles()

  const handleClick = () => {
    clearSelected()
  }

  if (Object.keys(restaurant).length > 0) {
    return (
      <div ref={refProp} className="restaurant-detail">
        <div className="row-1">
          <div className="column-1">
            <div className="name">{restaurant.name}</div>
            <div className="detail-page">
              <Link to={`/${restaurant.id}`} onClick={handleClick}>
                See details
              </Link>
            </div>
          </div>
          <div className="column-2">
            <div className="address">{restaurant.address}</div>
            <div className="url">
              <a href={restaurant.url}>Website</a>
            </div>
          </div>
        </div>
        <div className="row-2" />
        {restaurant.photos && restaurant.photos.length > 0 && (
          <div className="row-3">
            <div className={classes.root}>
              <GridList className={classes.gridList} cols={2.5}>
                {restaurant.photos.map((tile) => (
                  <GridListTile key={tile.photo.id}>
                    <img src={tile.photo.url} />
                  </GridListTile>
                ))}
              </GridList>
            </div>
          </div>
        )}
      </div>
    )
  } else return null
}

const mapState = (state) => ({
  restaurant: state.restaurants.selectedRestaurant,
})

const mapDispatch = (dispatch) => ({
  clearSelected: () => dispatch(setRestaurant({})),
})

export default connect(mapState, mapDispatch)(RestaurantDetail)
