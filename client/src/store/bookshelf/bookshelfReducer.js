import * as types from './bookshelfActionTypes'

export const initialState = {
  bookshelf: [],
  genres: [],
  selectedGenres: [],
}

export default function bookshelf(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_BOOKSHELF_SUCCESS:
      return { ...state, bookshelf: action.bookshelf }
    case types.FETCH_GENRES_SUCCESS:
      return { ...state, genres: action.genres }
    case types.SELECTED_GENRES:
      return { ...state, selectedGenres: action.genres }
    default:
      return state
  }
}
