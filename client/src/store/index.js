import { combineReducers } from 'redux'
import book from './book/bookReducer'

const rootReducer = combineReducers({
  book,
})

export default rootReducer
