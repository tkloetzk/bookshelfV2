import { combineReducers } from 'redux'
import bookshelf from './bookshelf/bookshelfReducer'

const rootReducer = combineReducers({
  bookshelf,
})

export default rootReducer
