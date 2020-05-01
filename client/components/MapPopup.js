import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Popup} from 'react-mapbox-gl'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {Link} from 'react-scroll'
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
  },
  cover: {
    width: 151,
  },
}))

const MapPopup = (props) => {
  let {clearSelected, executeScroll, selected} = props
  const classes = useStyles()

  const handleClick = () => {
    history.push(`/restaurants/${selected.id}`)
    clearSelected()
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
              <Typography variant="h6" component="h6">
                {selected.name}
              </Typography>

              <Button type="button" size="small" onClick={executeScroll}>
                see details
              </Button>
              <Button type="button" size="small" onClick={handleClick}>
                more info
              </Button>
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
