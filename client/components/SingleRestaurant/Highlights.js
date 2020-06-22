import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import {Chip} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root2: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}))

const Highlights = (props) => {
  const {restaurant} = props

  const classes = useStyles()

  return (
    <div className="highlights">
      <h4>Highlights</h4>
      <div className={classes.root2}>
        {restaurant.highlights.map((highlight) => (
          <Chip key={highlight} label={highlight} />
        ))}
      </div>
    </div>
  )
}

export default Highlights
