import { MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { fireEvent, render, wait, cleanup } from '@testing-library/react'
import muiTheme from '../../../config/themeConfig'
import BookEdit from '../BookEdit'
import '@testing-library/jest-dom/extend-expect'

const mockStore = configureMockStore()

describe('Book', () => {
  let book
  let props
  let store

  beforeEach(() => {
    book = {
      categories: ['Toddler', 'Parenting'],
      unread: true,
      owned: true,
      _id: '5c7893eabc9b222a3547548f',
      amazonAverageRating: 4.2,
      amazonRatingsCount: 611,
      price: '',
      isbn: '9780553381436',
      title: 'The Happiest Toddler on the Block',
      subtitle:
        'The New Way to Stop the Daily Battle of Wills and Raise a Secure and Well-Behaved One- to Four-Year-Old',
      description:
        "The pediatrician-author of The Happiest Baby on the Block offers parents a groundbreaking new approach for dealing with toddlers, drawing a parallel between a child's development and humankind's journey to civilization and presenting specific behavioral techniques designed to enhance parent-child communication, alleviate tantrums, and increase positive relationships. Reprint. 60,000 first printing.",
      thumbnail:
        'http://books.google.com/books/content?id=njQpY18IazsC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      goodreadsAverageRating: 3.5,
      goodreadsRatingsCount: 5451,
      __v: 0,
    }

    store = mockStore({
      bookshelf: { genres: book.categories },
    })

    props = { book, handleSave: jest.fn(), setEditMode: jest.fn() }
  })
  afterEach(cleanup)
  describe('render', () => {
    it('should render as expected', () => {
      const { asFragment } = render(
        <Provider store={store}>
          <MuiThemeProvider theme={muiTheme}>
            <BookEdit {...props} />
          </MuiThemeProvider>
        </Provider>
      )
      expect(asFragment()).toMatchSnapshot()
    })
  })
  describe('handleEditSave', () => {
    it('called when save button clicked', async () => {
      const newTitle = 'new title'
      const { getByTestId, asFragment } = render(
        <Provider store={store}>
          <MuiThemeProvider theme={muiTheme}>
            <BookEdit {...props} />
          </MuiThemeProvider>
        </Provider>
      )

      await wait(() => {
        fireEvent.change(getByTestId('titleTextBar'), {
          target: { id: 'title', value: newTitle },
        })
      })

      await wait(() => {
        fireEvent.click(getByTestId('saveButton'))
      })

      expect(props.handleSave).toHaveBeenCalledWith(
        {
          ...book,
          title: newTitle,
        },
        [{ currentValue: book.title, key: 'title', newValue: newTitle }]
      )
    })
  })

  describe('handleCancel', () => {
    it('called when cancel button clicked', async () => {
      const newTitle = 'new title'
      const { getByTestId, asFragment } = render(
        <Provider store={store}>
          <MuiThemeProvider theme={muiTheme}>
            <BookEdit {...props} />
          </MuiThemeProvider>
        </Provider>
      )

      await wait(() => {
        fireEvent.change(getByTestId('titleTextBar'), {
          target: { id: 'title', value: newTitle },
        })
      })

      await wait(() => {
        fireEvent.click(getByTestId('cancelButton'))
      })
      expect(asFragment()).toMatchSnapshot()
    })
  })
})
