import bookshelfReducer, { initialState } from '../bookshelfReducer'
import FETCH_BOOKSHELF_SUCCESS from '../bookshelfActionTypes'

describe('bookshelfReducer', () => {
  it('returned initialState', () => {
    expect(bookshelfReducer(undefined, {})).toEqual(initialState)
  })
  it('sets bookshelf for FETCH_BOOKSHELF_SUCCESS', () => {
    const bookshelf = [{ title: 'book title' }]
    const action = {
      type: FETCH_BOOKSHELF_SUCCESS,
      bookshelf,
    }
    expect(bookshelfReducer(initialState, action)).toEqual({
      ...initialState,
      bookshelf,
    })
  })
})
