import * as types from './bookshelfActionTypes'

export const initialState = {
  bookshelf: [],
}

export default function bookshelf(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_BOOKSHELF_SUCCESS:
      return { ...state, bookshelf: action.bookshelf }
    default:
      return state
  }
}
