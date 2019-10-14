import axios from 'axios'
import getAmazonBookService from '../amazonService'
import apiConfig from '../../config/apiConfig'
import MockAdapter from 'axios-mock-adapter'

describe('getAmazonBookService', () => {
  let mock
  let spy
  beforeAll(() => {
    mock = new MockAdapter(axios)
  })

  beforeEach(() => {
    spy = jest.spyOn(axios, 'post')
  })

  afterEach(() => {
    spy.mockRestore()
    mock.reset()
  })

  afterAll(() => {
    mock.restore()
  })

  it('calls service and returns response when successful', () => {
    const response = {
      data: {
        book: {
          title: 'Amazon Book Title',
        },
      },
    }

    const promise = Promise.resolve(response)

    mock.onPost(apiConfig.amazonV2).replyOnce(200, promise)
    return getAmazonBookService('1234').then(res => {
      expect(spy).toHaveBeenCalledWith(apiConfig.amazonV2, '1234')
    })
  })
})
