import map from 'lodash/map'
import * as types from '../bookshelfActionTypes'
import * as actions from '../bookshelfActions'
import {
  getBookshelfService,
  getGenresBookshelfService,
} from '../../../services/bookshelfService'

jest.mock('../../../services/bookshelfService')

describe('bookshelfActions', () => {
  let bookshelf
  let dispatch
  beforeEach(() => {
    bookshelf = [
      {
        amazonAverageRating: 4.5,
        amazonRatingsCount: 553,
        categories: ['Family & Relationships'],
        description:
          'Answers the most important parenting questions about raising children from birth through kindergarten, covering such topics as discipline, sleeping, day care, safety, independence, and feeding.',
        differences: [
          {
            currentValue: 3.9,
            key: 'amazonAverageRating',
            newValue: 4.5,
          },
        ],
        goodreadsAverageRating: 4,
        goodreadsRatingsCount: 40,
        isbn: '9781402218279',
        price: '',
        subtitle:
          'From Birth to Kindergarten, Answers to the Top 150 Questions about Raising a Young Child',
        thumbnail:
          'http://books.google.com/books/content?id=oD0omQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
        title: 'The New Baby Answer Book',
      },
    ]
    dispatch = jest.fn()
    jest.clearAllMocks()
  })
  describe('getBookshelfSuccess', () => {
    it('dispatches bookshelf when successful', () => {
      const action = {
        type: types.FETCH_BOOKSHELF_SUCCESS,
        bookshelf,
      }
      expect(actions.getBookshelfSuccess(action.bookshelf)).toEqual(action)
    })
  })
  describe('getBookshelf', () => {
    it('should dispatch success if getBookshelfService is successful', async () => {
      getBookshelfService.mockResolvedValue(bookshelf)

      await actions
        .getBookshelf()(dispatch)
        .then(resp => expect(resp).toMatchSnapshot())
    })
    it('should dispatch the error if getBookshelfService fails', async () => {
      const error = { id: 'error' }

      getBookshelfService.mockRejectedValue(error)
      await actions
        .getBookshelf()(dispatch)
        .catch(() => {
          expect(console.error).toHaveBeenCalled()
        })
    })
  })
  describe('getGenres', () => {
    let genres
    beforeEach(() => {
      genres = ['Religion', 'Newborn']
    })
    it('should dispatch success if getGenresBookshelfService is successful', async () => {
      getGenresBookshelfService.mockResolvedValue(genres)

      const genresResponse = map(genres, genre => {
        return { label: genre, value: genre }
      })
      await actions
        .getGenres()(dispatch)
        .then(resp => expect(resp).toEqual(genresResponse))
    })
    it('should dispatch error if getGenresBookshelfService fails', async () => {
      const error = { id: 'error' }

      getGenresBookshelfService.mockRejectedValue(error)
      await actions
        .getGenres()(dispatch)
        .catch(() => {
          expect(console.error).toHaveBeenCalled()
        })
    })
  })
})
