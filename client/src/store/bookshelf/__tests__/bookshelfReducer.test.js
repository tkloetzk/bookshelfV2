import bookshelfReducer, { initialState } from '../bookshelfReducer'
import * as types from '../bookshelfActionTypes'

describe('bookshelfReducer', () => {
  it('returned initialState', () => {
    expect(bookshelfReducer(undefined, {})).toEqual(initialState)
  })
  it('sets bookshelf for FETCH_BOOKSHELF_SUCCESS', () => {
    const bookshelf = [{ title: 'book title' }]
    const action = {
      type: types.FETCH_BOOKSHELF_SUCCESS,
      bookshelf,
    }
    expect(bookshelfReducer(initialState, action)).toEqual({
      ...initialState,
      bookshelf,
    })
  })
})
