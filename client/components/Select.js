import React, {useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const SelectDropdown = (props) => {
  const classes = useStyles()
  const {cuisines, handleChange, selectedCategory} = props
  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Category</InputLabel>
        <Select
          value={selectedCategory}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={handleChange}
          label="category"
        >
          <MenuItem value="All">All</MenuItem>
          {cuisines.sort().map((cuisine, i) => (
            <MenuItem key={i} value={cuisine}>
              {cuisine}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default SelectDropdown
