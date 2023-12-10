import {combineReducers} from "redux";

const articles = (state = [], action)=>{
  switch(action.type){
    case 'SET_NEW_ARTICLES':
      return action.payload
    default:
      return state
  }
}
const tags = (state = [], action)=>{
  switch(action.type){
    case 'SET_TAGS':
      return action.payload
    default:
      return state
  }
}

const rootReducer =combineReducers({
  articles,
  tags
})

export default rootReducer