import axios from 'axios'
import getAmazonBookService from '../amazonService'
import apiConfig from '../../config/apiConfig'

describe('getAmazonBookService', () => {
  let spy

  beforeEach(() => {
    spy = jest.spyOn(axios, 'post')
  })

  it('calls service and returns response when successful', () => {
    const response = {
      data: {
        book: {
          amazonAverageRating: 4.5,
          amazonRatingsCount: 553,
          price: '',
          isbn: '9789079208043',
        },
      },
    }

    axios.post.mockResolvedValue(response)
    return getAmazonBookService(response.data.book.isbn).then(res => {
      expect(spy).toHaveBeenCalledWith(apiConfig.amazonV2, {
        isbn: response.data.book.isbn,
      })
      expect(res).toEqual(response.data.book)
    })
  })
  it('calls service and returns error response when unsuccessful', () => {
    const error = 'Error message'
    const isbn = '1234'
    axios.post.mockRejectedValue(error)
    return getAmazonBookService(isbn).then(res => {
      expect(spy).toHaveBeenCalledWith(apiConfig.amazonV2, { isbn })
      expect(res).toEqual({ amazonError: isbn, error })
    })
  })
})
