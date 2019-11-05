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
  it('sets genres for FETCH_GENRES_SUCCESS', () => {
    const genres = ['genre1']
    const action = {
      type: types.FETCH_GENRES_SUCCESS,
      genres,
    }
    expect(bookshelfReducer(initialState, action)).toEqual({
      ...initialState,
      genres,
    })
  })
  it('sets genres for FETCH_GENRES_SUCCESS', () => {
    const genres = ['genre1']
    const action = {
      type: types.FETCH_GENRES_SUCCESS,
      genres,
    }
    expect(bookshelfReducer(initialState, action)).toEqual({
      ...initialState,
      genres,
    })
  })
})
