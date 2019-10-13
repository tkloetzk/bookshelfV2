import SAVE_COMBINED_BOOKS_SUCCESS from './bookActionTypes'

export const initialState = {
  booklist: [],
}

export default function book(state = initialState, action) {
  switch (action.type) {
    case SAVE_COMBINED_BOOKS_SUCCESS:
      return { ...state, booklist: [...state.booklist, action.booklist] }
    default:
      return state
  }
}
