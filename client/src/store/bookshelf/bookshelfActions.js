import * as types from './bookshelfActionTypes'
import {
  getBookshelfService,
  getGenresBookshelfService,
} from '../../services/bookshelfService'
import map from 'lodash/map'

export function getGenresSuccess(genres) {
  return {
    type: types.FETCH_GENRES_SUCCESS,
    genres,
  }
}

export function getGenres() {
  return dispatch => {
    return getGenresBookshelfService()
      .then(response => {
        const genres = map(response, genre => {
          return { label: genre, value: genre }
        })
        dispatch(getGenresSuccess(genres))
        return genres
      })
      .catch(error => {
        console.error('get genres error', error)
      })
  }
}
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
        dispatch(getGenres())
        dispatch(getBookshelfSuccess(bookshelf))
        return bookshelf
      })
      .catch(error => {
        console.error('bookshelf error', error)
      })
  }
}
