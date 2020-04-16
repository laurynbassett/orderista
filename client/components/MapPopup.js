import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Popup} from 'react-mapbox-gl'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
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
  let {selected} = props
  const classes = useStyles()
  console.log('ST', props.selected)
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
            <Link to="/detail">See Details</Link>
          </CardContent>
        </div>
        {selected.image && (
          <CardMedia className={classes.cover} image={selected.image} />
        )}
      </Card>
    </Popup>
  )
}

const mapState = (state) => ({
  selected: state.restaurants.selectedRestaurant,
})

export default connect(mapState)(MapPopup)
