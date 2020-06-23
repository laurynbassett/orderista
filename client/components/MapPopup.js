import React from 'react'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {Popup} from 'react-mapbox-gl'
import {makeStyles} from '@material-ui/core/styles'
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core'

import history from '../history'
import {setRestaurant} from '../store/restaurants'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
    fontFamily: 'Open Sans',
  },
  cover: {
    width: 151,
  },
  h6: {
    fontFamily: 'Poppins',
    fontWeight: '300',
  },
  button: {
    fontFamily: 'Open Sans',
    fontWeight: '300',
    color: '#8a8a8a',
  },
}))

const MapPopup = (props) => {
  let {clearSelected, executeScroll, selected} = props
  const classes = useStyles()

  const handleClick = () => {
    // const restaurantId = selected.id
    // history.push(`/restaurants/${restaurantId}`)
    clearSelected()
    console.log('CLEARED')
  }

  if (Object.keys(selected).length > 0) {
    const coords = [Number(selected.longitude), Number(selected.latitude)]

    return (
      <Popup
        coordinates={coords}
        anchor="bottom"
        offset={[0, 15]}
        closeButton={false}
        closeOnClick={true}
      >
        <Card className={classes.root}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography className={classes.h6} variant="h6" component="h6">
                {selected.name}
              </Typography>

              <Button
                className={classes.button}
                type="button"
                size="small"
                onClick={executeScroll}
              >
                quick view
              </Button>
              <Link to={`/restaurants/${selected.id}`}>
                <Button
                  className={classes.button}
                  type="button"
                  size="small"
                  onClick={handleClick}
                >
                  see details
                </Button>
              </Link>
            </CardContent>
          </div>
          {selected.image && (
            <CardMedia className={classes.cover} image={selected.image} />
          )}
        </Card>
      </Popup>
    )
  } else return null
}

const mapState = (state) => ({
  selected: state.restaurants.selectedRestaurant,
})

const mapDispatch = (dispatch) => ({
  clearSelected: () => dispatch(setRestaurant({})),
})

export default withRouter(connect(mapState, mapDispatch)(MapPopup))
