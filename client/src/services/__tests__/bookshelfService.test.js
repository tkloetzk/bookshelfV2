import axios from 'axios'
import {
  addBookshelfService,
  getBookshelfService,
  updateBookOnBookshelfService,
} from '../bookshelfService'
import apiConfig from '../../config/apiConfig'

describe('bookshelfService', () => {
  describe('addBookshelfService', () => {
    it('calls service and returns response when successful', () => {
      const books = {
        data: [
          {
            categories: ['Religion'],
            read: false,
            owned: false,
            _id: '5c9d7c34bc300b4070e9d9c9',
            title: "Raising a Daughter After God's Own Heart",
            subtitle: 'undefined',
            isbn: '9780736917728',
            description:
              'Elizabeth George, bestselling author and mother of two daughters, provides biblical insight and guidance for every mom who wants to lead their daughter to a godly life through example, study, and prayer. Elizabeth includes questions to draw moms and daughter closer as together they pursue spiritual priorities and God s heart."',
            amazonAverageRating: 4.4,
            amazonRatingsCount: 2441,
            goodreadsAverageRating: 4.24,
            goodreadsRatingsCount: 150,
            thumbnail:
              'http://books.google.com/books/content?id=K_AhmQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
            price: '',
            __v: 0,
          },
          {
            categories: ['Newborn'],
            read: true,
            owned: true,
            _id: '5c6f350badff7d391560777d',
            amazonAverageRating: 4.6,
            amazonRatingsCount: 29,
            price: '',
            isbn: '9780553588729',
            title: 'The Happiest Baby on the Block',
            subtitle:
              'The New Way to Calm Crying and Help Your Baby Sleep Longer',
            description:
              'A pediatrician and child development specialist combines medical research with personal experience to create a four-step plan for soothing a cranky infant.',
            thumbnail:
              'http://books.google.com/books/content?id=LEhQAAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
            goodreadsAverageRating: 3.92,
            goodreadsRatingsCount: 19505,
            __v: 0,
          },
        ],
      }

      axios.post.mockResolvedValue(books)
      return addBookshelfService(books.data).then(res => {
        expect(axios.post).toHaveBeenCalledWith(
          `${apiConfig.bookshelf}/add`,
          books.data
        )
        expect(res).toEqual(books.data)
      })
    })
    it('calls service and returns error response when unsuccessful', () => {
      const errorMessage = 'Error message'
      axios.post.mockRejectedValue(errorMessage)
      return addBookshelfService([{ title: 'title book' }])
        .then(() => {
          expect(axios.post).toHaveBeenCalledWith(
            `${apiConfig.bookshelf}/add`,
            [{ title: 'title book' }]
          )
        })
        .catch(error => {
          expect(error).toEqual(errorMessage)
        })
    })
  })
  // describe('updateBooksBookshelfService', () => {

  // })
  describe('updateBookOnBookshelfService', () => {
    const id = '1a2b'
    const fields = { title: 'New Book Title', goodreadsRatingsCount: 123 }

    it('calls service and returns response when successful', () => {
      axios.put.mockResolvedValue()
      return updateBookOnBookshelfService(id, fields).then(res => {
        expect(axios.put).toHaveBeenCalledWith(
          `${apiConfig.bookshelf}/update/${id}`,
          fields
        )
      })
    })
    it('calls service and returns error response when unsuccessful', () => {
      const errorMessage = 'Error message'
      axios.put.mockRejectedValue(errorMessage)
      return updateBookOnBookshelfService(id, fields)
        .then(() => {
          expect(axios.put).toHaveBeenCalledWith(
            `${apiConfig.bookshelf}/update/${id}`,
            [{ title: 'title book' }]
          )
        })
        .catch(error => {
          expect(error).toEqual(errorMessage)
        })
    })
  })
  describe('getBookshelfService', () => {
    it('calls service and returns response when successful', () => {
      const response = {
        data: [
          {
            categories: ['Religion'],
            read: false,
            owned: false,
            _id: '5c9d7c34bc300b4070e9d9c9',
            title: "Raising a Daughter After God's Own Heart",
            subtitle: 'undefined',
            isbn: '9780736917728',
            description:
              'Elizabeth George, bestselling author and mother of two daughters, provides biblical insight and guidance for every mom who wants to lead their daughter to a godly life through example, study, and prayer. Elizabeth includes questions to draw moms and daughter closer as together they pursue spiritual priorities and God s heart."',
            amazonAverageRating: 4.4,
            amazonRatingsCount: 2441,
            goodreadsAverageRating: 4.24,
            goodreadsRatingsCount: 150,
            thumbnail:
              'http://books.google.com/books/content?id=K_AhmQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
            price: '',
            __v: 0,
          },
          {
            categories: ['Newborn'],
            read: true,
            owned: true,
            _id: '5c6f350badff7d391560777d',
            amazonAverageRating: 4.6,
            amazonRatingsCount: 29,
            price: '',
            isbn: '9780553588729',
            title: 'The Happiest Baby on the Block',
            subtitle:
              'The New Way to Calm Crying and Help Your Baby Sleep Longer',
            description:
              'A pediatrician and child development specialist combines medical research with personal experience to create a four-step plan for soothing a cranky infant.',
            thumbnail:
              'http://books.google.com/books/content?id=LEhQAAAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
            goodreadsAverageRating: 3.92,
            goodreadsRatingsCount: 19505,
            __v: 0,
          },
        ],
      }

      axios.post.mockResolvedValue(response)
      return getBookshelfService().then(res => {
        expect(axios.post).toHaveBeenCalledWith(apiConfig.bookshelf, [])
        expect(res).toEqual(response.data)
      })
    })
    it('calls service and returns error response when unsuccessful', () => {
      const errorMessage = 'Error message'
      axios.post.mockRejectedValue(errorMessage)
      return getBookshelfService()
        .then(() => {
          expect(axios.post).toHaveBeenCalledWith(apiConfig.bookshelf, [])
        })
        .catch(error => {
          expect(error).toEqual(errorMessage)
        })
    })
  })
})
