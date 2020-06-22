import React from 'react'
import {connect} from 'react-redux'
import {makeStyles} from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

// import cuisineList from '../../server/api/cuisines';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    fontFamily: 'Poppins',
    minWidth: 120,
    '& > *': {
      fontFamily: 'Poppins',
    },
    '& label': {
      fontFamily: 'Open Sans',
      fontWeight: '300',
      marginRight: 10,
      paddingRight: 10,
    },
    '& fieldset': {
      fontFamily: 'Poppins',
    },
    '& label.Mui-focused': {
      color: '#90a4ae',
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: '#90a4ae',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#90a4ae',
      },
    },
    '&:after': {
      borderColor: '#f73378',
    },
  },
  select: {
    fontFamily: 'Open Sans',
    fontWeight: '300',
  },
  menuItem: {
    fontFamily: 'Open Sans',
    fontWeight: '300',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

const SelectDropdown = (props) => {
  const classes = useStyles()
  const {cuisines, handleChange, selectedCategory} = props
  console.log('SELECT CUISINE', cuisines)
  return (
    <div>
      <FormControl variant="outlined" className={classes.root}>
        <InputLabel>Category</InputLabel>
        <Select
          className={classes.select}
          value={selectedCategory}
          // labelId='demo-simple-select-outlined-label'
          id="select-outlined"
          onChange={handleChange}
          label="cuisine"
        >
          <MenuItem className={classes.menuItem} value="All">
            All
          </MenuItem>
          {cuisines.sort().map((cuisine) => (
            <MenuItem
              key={cuisine}
              className={classes.menuItem}
              value={cuisine}
            >
              {cuisine}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

const mapState = (state) => ({
  selectedCategory: state.restaurants.selectedCategory,
})

export default connect(mapState)(SelectDropdown)
