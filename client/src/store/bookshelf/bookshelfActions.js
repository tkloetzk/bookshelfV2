import * as types from './bookshelfActionTypes'
import {
  getBookshelfService,
  addBookshelfService,
} from '../../services/bookshelfService'

export function getBookshelfSuccess(bookshelf) {
  return {
    type: types.FETCH_BOOKSHELF_SUCCESS,
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

export function addBookToBookshelfSuccess() {
  return {
    type: types.ADD_BOOK_TO_BOOKSHELF_SUCCESS,
  }
}

export function addBookToBookshelf(booklist) {
  return dispatch => {
    return addBookshelfService(booklist)
      .then(() => {
        dispatch(addBookToBookshelfSuccess())
        dispatch(getBookshelf())
        return true
      })
      .catch(error => {
        console.error('add book to bookshelf error', error)
      })
  }
}
