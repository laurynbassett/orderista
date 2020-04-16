import {applyMiddleware, combineReducers, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import user from './user'
import restaurants from './restaurants'

// ---------- REDUCER---------- //
const reducer = combineReducers({user, restaurants})

// ---------- MIDDLEWARE ---------- //
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, loggerMiddleware)
)

// ---------- STORE ---------- //
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './restaurants'
