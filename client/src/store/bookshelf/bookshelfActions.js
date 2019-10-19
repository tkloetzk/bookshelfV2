import FETCH_BOOKSHELF_SUCCESS from './bookshelfActionTypes'
import { getBookshelfService } from '../../services/bookshelfService'

export function getBookshelfSuccess(bookshelf) {
  return {
    type: FETCH_BOOKSHELF_SUCCESS,
    bookshelf,
  }
}

export function getBookshelf() {
  return dispatch => {
    return getBookshelfService()
      .then(bookshelf => {
        dispatch(getBookshelfSuccess(bookshelf))
        return bookshelf
      })
      .catch(error => {
        console.error('bookshelf error', error)
      })
  }
}
