import React from 'react'
import {Card, GridList, GridListTile} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

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
}))

const PhotoGrid = (props) => {
  const {restaurant} = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <GridList className={classes.gridList} cols={2.5}>
        {restaurant.photos.map((tile) => (
          <GridListTile key={tile.photo.id}>
            <img src={tile.photo.url} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

export default PhotoGrid
