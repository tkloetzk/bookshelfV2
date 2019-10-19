import axios from 'axios'
import getGoogleBookService from '../googleService'
import apiConfig from '../../config/apiConfig'

describe('getGoogleBookService', () => {
  let spy

  beforeEach(() => {
    spy = jest.spyOn(axios, 'get')
  })

  it('calls service and returns response when successful', () => {
    const response = {
      data: {
        title: 'The Wonder Weeks',
        isbn: '9789079208043',
        subtitle:
          "How to Stimulate Your Baby's Mental Development and Help Him Turn His 10 Predictable, Great, Fussy Phases Into Magical Leaps Forward",
        description:
          'This resource describes in easy-to-understand terms the incredible developmental changes that all babies go through during the first 20 months of their lives. These changes enable a baby to enter a whole new perceptual world and, as a consequence, to learn many new skills.',
        thumbnail:
          'http://books.google.com/books/content?id=GMXpYQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
        categories: ['Family & Relationships'],
      },
    }

    axios.get.mockResolvedValue(response)
    return getGoogleBookService(response.data.isbn).then(res => {
      expect(spy).toHaveBeenCalledWith(
        `${apiConfig.google}/${response.data.isbn}`
      )
      expect(res).toEqual(response.data)
    })
  })
  it('calls service and returns error response when unsuccessful', () => {
    const error = 'Error message'
    const isbn = '1234'
    axios.get.mockRejectedValue(error)
    return getGoogleBookService(isbn).then(res => {
      expect(spy).toHaveBeenCalledWith(`${apiConfig.google}/${isbn}`)
      expect(res).toEqual({ googleError: isbn, error })
    })
  })
})
