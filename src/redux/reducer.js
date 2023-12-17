import { combineReducers } from 'redux'

const articles = (state = [], action) => {
  switch (action.type) {
    case 'SET_ARTICLES':
      return action.payload
    default:
      return state
  }
}
const article = (state = '', action) => {
  switch (action.type) {
    case 'SET_ARTICLE':
      return action.payload
    default:
      return state
  }
}
const tags = (state = [], action) => {
  switch (action.type) {
    case 'SET_TAGS':
      return action.payload
    default:
      return state
  }
}
const user = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, ...action.payload }
    default:
      return state
  }
}

const mode = (state = { auth: false, login: false, loading: false }, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      return { ...state, auth: action.payload }
    case 'SET_LOGIN':
      return { ...state, login: action.payload }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  articles,
  article,
  tags,
  user,
  mode,
})

export default rootReducer
