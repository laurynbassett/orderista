import axios from 'axios'

// ---------- INITIAL STATE ---------- //
const initialState = {
  restaurants: [],
  selectedRestaurant: {},
}

// ---------- ACTION TYPES ---------- //
const GET_RESTAURANTS = 'GET_RESTAURANTS'
const SET_RESTAURANT = 'SET_RESTAURANT'

// ---------- ACTION CREATORS ---------- //
const getRestaurants = (restaurants) => ({type: GET_RESTAURANTS, restaurants})

const setSelectedRestaurant = (restaurant) => ({
  type: SET_RESTAURANT,
  restaurant,
})

// ---------- THUNK CREATORS ---------- //
export const fetchRestaurants = () => async (dispatch) => {
  try {
    const {data} = await axios.get('/restaurants')
    dispatch(getRestaurants(data || initialState))
  } catch (err) {
    console.error(err)
  }
}

export const setRestaurant = (restaurant) => (dispatch) => {
  dispatch(setSelectedRestaurant(restaurant))
}

// ---------- REDUCER ---------- //
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RESTAURANTS:
      return {...state, restaurants: action.restaurants}
    case SET_RESTAURANT:
      return {...state, selectedRestaurant: action.restaurant}
    default:
      return state
  }
}
