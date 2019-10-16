import { MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import { fireEvent, render, wait } from '@testing-library/react'
import muiTheme from '../../../config/themeConfig'
import Bookshelf from '../Bookshelf'
import '@testing-library/jest-dom/extend-expect'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

const mockStore = configureMockStore()

describe('Bookshelf', () => {
  describe('render', () => {
    it('should render as expected if bookshelf is empty', () => {
      let store = mockStore({
        bookshelf: { bookshelf: [] },
      })
      store.dispatch = jest.fn()

      const { asFragment } = render(
        <Provider store={store}>
          <MuiThemeProvider theme={muiTheme}>
            <Bookshelf />
          </MuiThemeProvider>
        </Provider>
      )
      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(asFragment()).toMatchSnapshot()
    })
    it('should render as expected if bookshelf has books', () => {
      let store = mockStore({
        bookshelf: {
          bookshelf: [
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
          ],
        },
      })
      store.dispatch = jest.fn()
      const { asFragment } = render(
        <Provider store={store}>
          <MuiThemeProvider theme={muiTheme}>
            <Bookshelf />
          </MuiThemeProvider>
        </Provider>
      )
      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(asFragment()).toMatchSnapshot()
    })
  })
})
