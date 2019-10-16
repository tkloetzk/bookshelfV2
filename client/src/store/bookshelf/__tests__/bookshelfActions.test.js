import FETCH_BOOKSHELF_SUCCESS from '../bookshelfActionTypes'
import * as actions from '../bookshelfActions'
import getBookshelfService from '../../../services/bookshelfService'

jest.mock('../../../services/bookshelfService')

describe('bookshelfActions', () => {
  let bookshelf
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
  })
  describe('getBookshelfSuccess', () => {
    it('dispatches bookshelf when successful', () => {
      const action = {
        type: FETCH_BOOKSHELF_SUCCESS,
        bookshelf,
      }
      expect(actions.getBookshelfSuccess(action.bookshelf)).toEqual(action)
    })
  })
  describe('getBookshelf', () => {
    it('should dispatch success if getBookshelfService is successful', async () => {
      const dispatch = jest.fn()

      getBookshelfService.mockResolvedValue(bookshelf)
      await actions
        .getBookshelf()(dispatch)
        .then(res => {
          expect(res).toEqual(bookshelf)
        })
      expect(dispatch.mock.calls).toMatchSnapshot()
    })
    it('should dispatch the error if getBookshelfService fails', async () => {
      const error = { id: 'error' }
      const dispatch = jest.fn()

      getBookshelfService.mockRejectedValue(error)
      await actions
        .getBookshelf()(dispatch)
        .catch(e => {
          expect(console.error).toHaveBeenCalled()
        })
    })
  })
})
