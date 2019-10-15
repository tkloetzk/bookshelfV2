import axios from 'axios'
import search from '../searchService'
import apiConfig from '../../config/apiConfig'
import getGoogleBookService from '../googleService'
import getGoodreadsBooksService from '../goodreadsService'
import getAmazonBookService from '../amazonService'

jest.mock('../googleService')

jest.mock('../goodreadsService')

jest.mock('../amazonService')

describe('searchService', () => {
  let spy

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it('calls search service and returns response when successful', async () => {
    getGoogleBookService.mockReturnValueOnce({ title: '1234' })
    getGoogleBookService.mockReturnValueOnce({ title: '5678' })

    getGoodreadsBooksService.mockReturnValueOnce({ title: '1234' })
    getGoogleBookService.mockReturnValueOnce({ title: '5678' })

    getAmazonBookService.mockReturnValueOnce({ title: '1234' })
    getGoogleBookService.mockReturnValueOnce({ title: '5678' })

    const isbns = ['9789079208043', '1234566789']
    const response = [{ title: '1234' }, { title: '5678' }]

    const bookResponse = await search(isbns)

    expect(getAmazonBookService).toHaveBeenCalledTimes(isbns.length)
    expect(getGoodreadsBooksService).toHaveBeenCalledTimes(isbns.length)
    expect(getGoogleBookService).toHaveBeenCalledTimes(isbns.length)
    expect(bookResponse).toEqual(response)
  })
  // it('calls searchService and returns error responses when unsuccessful', async () => {
  //   getGoogleBookService.mockReturnValueOnce( {title: '1234'})
  //   getGoogleBookService.mockRejectedValue( {googleError: '5678'})

  //   getGoodreadsBooksService.mockReturnValueOnce({title: '1234'})
  //   getGoogleBookService.mockReturnValueOnce( {title: '5678'})

  //   getAmazonBookService.mockReturnValueOnce({title: '1234'})
  //   getGoogleBookService.mockReturnValueOnce( {title: '5678'})

  //   const isbns = ['9789079208043', '1234566789']
  //   const response =[ { title: '1234' }, { title: '5678' } ]

  //   const bookResponse = await search(isbns)

  //   expect(getAmazonBookService).toHaveBeenCalledTimes(isbns.length)
  //   expect(getGoodreadsBooksService).toHaveBeenCalledTimes(isbns.length)
  //   expect(getGoogleBookService).toHaveBeenCalledTimes(isbns.length)
  //   expect(bookResponse).toEqual(response)
  // })
})
