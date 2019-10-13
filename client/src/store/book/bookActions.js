import merge from 'lodash/merge'
import getGoodreadsBooksService from '../../services/goodreadsService'
import getGoogleBookService from '../../services/googleService'
import getAmazonBookService from '../../services/amazonService'
import SAVE_COMBINED_BOOKS_SUCCESS from './bookActionTypes'

export function saveCombinedBooksSuccess(booklist) {
  return {
    type: SAVE_COMBINED_BOOKS_SUCCESS,
    booklist,
  }
}

export function saveCombinedBook(books) {
  return dispatch => {
    dispatch(saveCombinedBooksSuccess(books))
  }
}

export function getBook(isbn) {
  return dispatch =>
    Promise.all([
      getGoogleBookService(isbn),
      getGoodreadsBooksService(isbn),
      getAmazonBookService(isbn),
    ]).then(book => {
      const combinedBook = merge({}, book[0], book[1], book[2])
      dispatch(saveCombinedBook(combinedBook))
    })
}
