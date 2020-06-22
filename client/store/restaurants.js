import axios from 'axios'
import restaurantsSeed from '../../script/restaurants-seed'

// ---------- INITIAL STATE ---------- //
const initialState = {
  restaurants: restaurantsSeed,
  cuisines: [],
  selectedRestaurant: {},
  selectedCategory: 'All',
}

// ---------- ACTION TYPES ---------- //
const GET_RESTAURANTS = 'GET_RESTAURANTS'
const GET_CUISINES = 'GET_CUISINES'
const SET_RESTAURANT = 'SET_RESTAURANT'
const SET_CATEGORY = 'SET_CATEGORY'

// ---------- ACTION CREATORS ---------- //
const getRestaurants = (restaurants) => ({type: GET_RESTAURANTS, restaurants})

const getCuisines = (restaurants) => ({type: GET_CUISINES, restaurants})

const setSelectedRestaurant = (restaurant) => ({
  type: SET_RESTAURANT,
  restaurant,
})

const setSelectedCategory = (category) => ({
  type: SET_CATEGORY,
  category,
})

// ---------- THUNK CREATORS ---------- //
export const fetchRestaurants = () => async (dispatch) => {
  try {
    console.log('FETCHING')
    // const { data } = await axios.get('/api/restaurants')
    // console.log('FETCHED RESTAURANTS', data)
    // dispatch(getRestaurants(data || initialState))
    // dispatch(getCuisines(data))
    dispatch(getRestaurants(restaurantsSeed))
  } catch (err) {
    console.error(err)
  }
}

export const fetchRestaurant = (restaurantId) => async (dispatch) => {
  try {
    console.log('FETCHING RESTAURANT', restaurantId)
    const {data} = await axios.get(`/api/restaurants/${restaurantId}`)
    console.log('FETCHED RESTAURANT', data)
    dispatch(setSelectedRestaurant(data))
  } catch (err) {
    console.error('ERROR FETCHING RESTAURANT ', err)
  }
}

export const setRestaurant = (restaurant) => (dispatch) => {
  dispatch(setSelectedRestaurant(restaurant))
}

export const setCategory = (category) => (dispatch) => {
  dispatch(setSelectedCategory(category))
}

// ---------- REDUCER ---------- //
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RESTAURANTS:
      return {...state, restaurants: action.restaurants}
    case GET_CUISINES:
      return {
        ...state,
        cuisines: action.restaurants.reduce((a, c) => {
          c.cuisines.forEach((el) => {
            if (!a.includes(el)) a.push(el)
          })
          return a
        }, []),
      }
    case SET_RESTAURANT:
      return {...state, selectedRestaurant: action.restaurant}
    case SET_CATEGORY:
      return {...state, selectedCategory: action.category}
    default:
      return state
  }
}
