import axios from 'axios'
import getGoodreadsBooksService from '../goodreadsService'
import apiConfig from '../../config/apiConfig'

describe('getGoodreadsBooksService', () => {
  let spy

  beforeEach(() => {
    spy = jest.spyOn(axios, 'get')
  })

  it('calls service and returns response when successful', () => {
    const response = {
      data: {
        isbn: '9789079208043',
        goodreadsAverageRating: 3.97,
        goodreadsRatingsCount: 3991,
      },
    }

    axios.get.mockResolvedValue(response)
    return getGoodreadsBooksService(response.data.isbn).then(res => {
      expect(spy).toHaveBeenCalledWith(
        `${apiConfig.goodreads}/${response.data.isbn}`
      )
      expect(res).toEqual(response.data)
    })
  })
  it('calls service and returns error response when unsuccessful', () => {
    const error = 'Error message'
    const isbn = '1234'
    axios.get.mockRejectedValue(error)
    return getGoodreadsBooksService(isbn).then(res => {
      expect(spy).toHaveBeenCalledWith(`${apiConfig.goodreads}/${isbn}`)
      expect(res).toEqual({ goodreadsError: isbn, error })
    })
  })
})
