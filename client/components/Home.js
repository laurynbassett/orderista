import React, {useRef} from 'react'
import {connect} from 'react-redux'
import List from '@material-ui/core/List'

import SelectDropdown from './Select'
import Map from './Map'
import RestaurantListItem from './RestaurantListItem'
import {setRestaurant, setCategory} from '../store/restaurants'
import RestaurantDetail from './RestaurantDetail'

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop)

// ---------- COMPONENT ---------- //
const Home = (props) => {
  const {
    restaurants,
    selectedRestaurant,
    selectedCategory,
    setSelectedRestaurant,
    setSelectedCategory,
  } = props

  const handleChange = (evt) => setSelectedCategory(evt.target.value)

  const handleClick = (evt) => setSelectedRestaurant(evt)

  const myRef = useRef(null)

  const executeScroll = () => scrollToRef(myRef)

  // get list of restaurant cuisines from restaurants
  const cuisines = restaurants.reduce((arr, restaurant) => {
    restaurant.cuisines.forEach((cuisine) => {
      if (!arr.includes(cuisine)) {
        arr.push(cuisine)
      }
    })
    return arr
  }, [])
  console.log('CUISINES', cuisines)

  return (
    <div className="home-container">
      <div className="home-row-1">
        <SelectDropdown
          handleChange={handleChange}
          cuisines={cuisines}
          selectedCategory={selectedCategory}
        />
      </div>
      <div className="home-row-2">
        <div className="home-row-2-col-1">
          <Map
            selectedCategory={selectedCategory}
            executeScroll={executeScroll}
          />
        </div>
        <div className="home-row-2-col-2">
          {restaurants && (
            <div>
              <List
                className="muiList"
                style={{maxHeight: '68vh', overflow: 'scroll'}}
              >
                {restaurants
                  .filter((el) =>
                    selectedCategory !== 'All'
                      ? el.cuisines.includes(selectedCategory)
                      : el.cuisines
                  )
                  .map((restaurant) => (
                    <RestaurantListItem
                      key={restaurant.id}
                      restaurant={restaurant}
                      handleClick={handleClick}
                    />
                  ))}
              </List>
            </div>
          )}
        </div>
      </div>
      <div className="home-row-3" id="restaurant-detail-id">
        {selectedRestaurant && (
          <RestaurantDetail
            refProp={myRef}
            name="restaurantDetail"
            id="restaurantDetail"
            selectedRestaurant={selectedRestaurant}
          />
        )}
      </div>
    </div>
  )
}

const mapState = (state) => ({
  restaurants: state.restaurants.restaurants,
  selectedRestaurant: state.restaurants.selectedRestaurant,
  selectedCategory: state.restaurants.selectedCategory,
})

const mapDispatch = (dispatch) => ({
  setSelectedRestaurant: (selected) => dispatch(setRestaurant(selected)),
  setSelectedCategory: (selected) => dispatch(setCategory(selected)),
})

export default connect(mapState, mapDispatch)(Home)
