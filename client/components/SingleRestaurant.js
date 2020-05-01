import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import Rating from '@material-ui/lab/Rating'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import LaunchIcon from '@material-ui/icons/Launch'
import DirectionsIcon from '@material-ui/icons/Directions'
import StarIcon from '@material-ui/icons/Star'
import CameraAltIcon from '@material-ui/icons/CameraAlt'
import TurnedInIcon from '@material-ui/icons/TurnedIn'
import ShareIcon from '@material-ui/icons/Share'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  root2: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
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

const SingleRestaurant = (props) => {
  const {restaurants} = props
  const classes = useStyles()
  const [restaurant, setRestaurant] = useState({})

  useEffect(() => {
    setRestaurant(
      restaurants.find((r) => +r.id === +props.match.params.restaurantId)
    )
  }, [restaurant])

  console.log('R', Array.isArray(restaurant.cuisines))
  console.log('C', restaurant.cuisines)

  if (Object.keys(restaurant).length > 0) {
    return (
      <div className="single-restaurant">
        <div className="single-restaurant row-1">
          {restaurant.photos.length > 0 && (
            <div className={classes.root}>
              <GridList className={classes.gridList} cols={2.5}>
                {restaurant.photos.map((tile) => (
                  <GridListTile key={tile.photo.id}>
                    <img src={tile.photo.url} />
                  </GridListTile>
                ))}
              </GridList>
            </div>
          )}
        </div>
        <div className="single-restaurant row-2 container">
          <div className="single-restaurant row-2 column-1 box">
            <div className="single-restaurant row-2 column-1-row-1">
              <div className="single-restaurant row-2 column-1-row-1 name">
                <h2>{restaurant.name}</h2>
              </div>
              <div className="single-restaurant row-2 column-1-row-1 rating">
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
              <div className="single-restaurant row-2 column-1-row-1 cuisine">
                <div>{'$'.repeat(restaurant.price_range)}</div>
                <div className="cuisines">
                  {restaurant.cuisines.reduce((a, c, i) => {
                    if (i > 0) a.push(', ')
                    a.push(
                      <a key={c} href={`/restaurants/${c}`}>
                        {c}
                      </a>
                    )
                    return a
                  }, [])}
                </div>
              </div>
              <div className="single-restaurant row-2 column-1-row-1 buttons">
                <Button variant="outlined">
                  <StarIcon /> Write a Review
                </Button>
                <Button variant="outlined">
                  <CameraAltIcon /> Add Photo
                </Button>
                <Button variant="outlined">
                  <ShareIcon /> Share
                </Button>
                <Button variant="outlined">
                  <TurnedInIcon /> Save
                </Button>
              </div>
            </div>
            <Divider />
            <div className="single-restaurant row-2 column-1-row-2 dishes">
              <h4>Popular Dishes</h4>
            </div>
            <Divider />
            <div className="single-restaurant row-2 column-1-row-3 location">
              <div className="single-restaurant row-2 column-1-row-3-row-1">
                <h4>Location & Hours</h4>
              </div>
              <div className="single-restaurant row-2 column-1-row-3-row-2">
                <div className="single-restaurant row-2 column-1-row-3-row-2-column-1">
                  <img className="single-restaurant map" src="" alt="map" />
                  <p>{restaurant.address}</p>
                </div>
                <div className="single-restaurant row-2 column-1-row-3-row-2-column-2">
                  <p>{restaurant.timings.split(', ').join('\n')}</p>
                </div>
              </div>
            </div>
            <Divider />

            <div className="single-restaurant row-2 column-1-row-4 amenities">
              <h4>Amenities</h4>
              <div className={classes.root2}>
                {restaurant.highlights.map((highlight) => (
                  <Chip key={highlight} label={highlight} />
                ))}
              </div>
            </div>
          </div>
          <div className="single-restaurant row-2 column-2 box">
            <Paper variant="outlined">
              <div className="website">
                <LaunchIcon />
                <a
                  href={restaurant.url}
                >{`${restaurant.name
                  .toLowerCase()
                  .split(' ')
                  .join('-')}.com`}</a>
              </div>
              <Divider variant="middle" />
              <div className="directions">
                <DirectionsIcon />
                <a
                  href={`/map/${restaurant.name
                    .toLowerCase()
                    .split(' ')
                    .join('-')}`}
                >
                  Get Directions
                </a>
              </div>
            </Paper>
          </div>
        </div>
      </div>
    )
  } else return null
}

const mapState = (state, ownProps) => {
  // const id = +ownProps.match.params.restaurantId;
  // const getRestaurant = state.restaurants.restaurants.find(restaurant => +restaurant.id === id);

  return {
    // restaurant: getRestaurant,
    restaurant: state.restaurants.selectedRestaurant,
    restaurants: state.restaurants.restaurants,
  }
}

export default connect(mapState)(SingleRestaurant)
