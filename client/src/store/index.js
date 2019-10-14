import { combineReducers } from 'redux'
import book from './book/bookReducer'
import bookshelf from './bookshelf/bookshelfReducer'

const rootReducer = combineReducers({
  book,
  bookshelf,
})

export default rootReducer
