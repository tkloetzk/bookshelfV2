import { MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import { fireEvent, render, wait, cleanup } from '@testing-library/react'
import muiTheme from '../../../config/themeConfig'
import Book from '../Book'
import '@testing-library/jest-dom/extend-expect'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore()

describe('Book', () => {
  let book
  beforeEach(() => {
    book = {
      categories: ['Toddler', 'Parenting'],
      unread: false,
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
  })
  afterEach(cleanup)
  describe('render', () => {
    it('should render as expected', () => {
      const { asFragment } = render(
        <MuiThemeProvider theme={muiTheme}>
          <Book book={book} />
        </MuiThemeProvider>
      )
      expect(asFragment()).toMatchSnapshot()
    })
    it('should render as expected if there is no thumbnail', () => {
      book = { ...book, thumbnail: null }
      const { asFragment } = render(
        <MuiThemeProvider theme={muiTheme}>
          <Book book={book} />
        </MuiThemeProvider>
      )
      expect(asFragment()).toMatchSnapshot()
    })
    it('should render as expected if there are differences', () => {
      book = {
        ...book,
        differences: [
          { key: 'title', currentValue: 'old title', newValue: book.title },
          {
            key: 'amazonRatingsCount',
            currentValue: 123,
            newValue: book.amazonRatingsCount,
          },
        ],
      }
      const { asFragment } = render(
        <MuiThemeProvider theme={muiTheme}>
          <Book book={book} />
        </MuiThemeProvider>
      )
      expect(asFragment()).toMatchSnapshot()
    })
    it('renders as expected with unread property', () => {
      book = { ...book, unread: true }
      const { asFragment } = render(
        <MuiThemeProvider theme={muiTheme}>
          <Book book={book} />
        </MuiThemeProvider>
      )
      expect(asFragment()).toMatchSnapshot()
    })
  })
  describe('expand', () => {
    it('expands on handleExpandClick', async () => {
      const { asFragment, getByTestId } = render(
        <MuiThemeProvider theme={muiTheme}>
          <Book book={book} />
        </MuiThemeProvider>
      )
      await wait(() => {
        fireEvent.click(getByTestId('expandButton'))
      })

      expect(asFragment()).toMatchSnapshot()
    })
  })
  describe('IconButtons', () => {
    let store
    beforeEach(() => {
      store = mockStore({
        bookshelf: { genres: book.categories },
      })
    })
    it('shows edit mode on edit button click', async () => {
      const { asFragment, getByTestId } = render(
        <Provider store={store}>
          <MuiThemeProvider theme={muiTheme}>
            <Book book={book} />
          </MuiThemeProvider>
        </Provider>
      )
      await wait(() => {
        fireEvent.click(getByTestId('editButton'))
      })

      expect(asFragment()).toMatchSnapshot()
    })
    it('shows the unowned icon for an unowned book', () => {
      book = { ...book, owned: false }
      const { asFragment } = render(
        <MuiThemeProvider theme={muiTheme}>
          <Book book={book} />
        </MuiThemeProvider>
      )

      expect(asFragment()).toMatchSnapshot()
    })
    describe('handleDelete', () => {
      it('called with correct parameter', async () => {
        const handleDelete = jest.fn()
        const { getByTestId } = render(
          <MuiThemeProvider theme={muiTheme}>
            <Book book={book} handleDelete={handleDelete} />
          </MuiThemeProvider>
        )

        await wait(() => {
          fireEvent.click(getByTestId('deleteButton'))
        })
        expect(handleDelete).toHaveBeenCalledWith(book)
      })
    })
    describe('handleSave', () => {
      it('called with correct parameters for unread', async () => {
        book = { owned: false }
        const handleSave = jest.fn()
        const { getByTestId } = render(
          <MuiThemeProvider theme={muiTheme}>
            <Book book={book} handleSave={handleSave} />
          </MuiThemeProvider>
        )

        await wait(() => {
          fireEvent.click(getByTestId('ownedIcon'))
        })
        expect(handleSave).toHaveBeenCalledWith({ owned: !book.owned }, [
          { key: 'owned', newValue: !book.owned },
        ])
      })
      it('called with correct parameters for owned', async () => {
        book = { ...book, owned: false }
        const handleSave = jest.fn()
        const { getByTestId } = render(
          <MuiThemeProvider theme={muiTheme}>
            <Book book={book} handleSave={handleSave} />
          </MuiThemeProvider>
        )

        await wait(() => {
          fireEvent.click(getByTestId('header'))
        })
        expect(handleSave).toHaveBeenCalledWith(book, [
          { key: 'unread', newValue: !book.unread },
        ])
      })
    })
  })
})
