import React from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'

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
  const {restaurant} = props
  const classes = useStyles()

  if (Object.keys(restaurant).length > 0) {
    return (
      <div ref={props.refProp} className="restaurant-detail">
        <div className="restaurant-detail row-1 box">
          <div className="restaurant-detail row-1 column-1">
            <div className="restaurant-detail name">{restaurant.name}</div>
          </div>
          <div className="restaurant-detail row-1 column-2">
            <div className="restaurant-detail url">
              <a href={restaurant.url}>Website</a>
            </div>
            <div className="restaurant-detail address">
              {restaurant.address}
            </div>
          </div>
        </div>
        <div className="restaurant-detail row-2" />
        {restaurant.photos.length > 0 && (
          <div className="restaurant-detail row-3">
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

export default connect(mapState)(RestaurantDetail)
