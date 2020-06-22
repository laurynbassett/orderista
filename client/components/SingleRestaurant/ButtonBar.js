import React from 'react'
import {Button} from '@material-ui/core'
import {CameraAlt, Share, Star} from '@material-ui/icons'

const ButtonBar = () => {
  return (
    <div className="buttons">
      <Button variant="outlined">
        <Star /> Write a Review
      </Button>
      <Button variant="outlined">
        <CameraAlt /> Add Photo
      </Button>
      <Button variant="outlined">
        <Share /> Share
      </Button>
    </div>
  )
}

export default ButtonBar
