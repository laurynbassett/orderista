import axios from 'axios'

// ---------- INITIAL STATE ---------- //
const initialState = []

// ---------- ACTION TYPES ---------- //
const GET_RESTAURANTS = 'GET_RESTAURANTS'

// ---------- ACTION CREATORS ---------- //
const getRestaurants = (restaurants) => ({type: GET_RESTAURANTS, restaurants})

// ---------- THUNK CREATORS ---------- //
export const fetchRestaurants = () => async (dispatch) => {
  try {
    const {data} = await axios.get('/restaurants')
    dispatch(getRestaurants(data || initialState))
  } catch (err) {
    console.error(err)
  }
}

// ---------- REDUCER ---------- //
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_RESTAURANTS:
      return action.restaurants
    default:
      return state
  }
}
