import FETCH_BOOKSHELF_SUCCESS from './bookshelfActionTypes'

export const initialState = {
  bookshelf: [],
}

export default function bookshelf(state = initialState, action) {
  switch (action.type) {
    case FETCH_BOOKSHELF_SUCCESS:
      return Object.assign({}, state, { bookshelf: action.bookshelf })
    default:
      return state
  }
}
