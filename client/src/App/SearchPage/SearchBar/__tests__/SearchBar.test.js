import { MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import { fireEvent, render, wait } from '@testing-library/react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import muiTheme from '../../../../config/themeConfig'
import SearchBar from '../SearchBar'
import '@testing-library/jest-dom/extend-expect'
import {
  addBookshelfService,
  updateBooksBookshelfService,
} from '../../../../services/bookshelfService'

const mockStore = configureMockStore()

jest.mock('../../../../services/bookshelfService')

describe('SearchBar', () => {
  let store
  let props
  let book
  let differences

  beforeEach(() => {
    store = mockStore({
      bookshelf: { bookshelf: [] },
    })
    store.dispatch = jest.fn()

    props = { setBooklist: jest.fn(), booklist: [] }
    book = {
      amazonAverageRating: 4.5,
      amazonRatingsCount: 553,
      categories: ['Family & Relationships'],
      description:
        'Answers the most important parenting questions about raising children from birth through kindergarten, covering such topics as discipline, sleeping, day care, safety, independence, and feeding.',
      goodreadsAverageRating: 4,
      goodreadsRatingsCount: 40,
      isbn: '9781402218279',
      price: '',
      subtitle:
        'From Birth to Kindergarten, Answers to the Top 150 Questions about Raising a Young Child',
      thumbnail:
        'http://books.google.com/books/content?id=oD0omQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
      title: 'The New Baby Answer Book',
      id: '1',
    }
    differences = [
      {
        currentValue: 3.9,
        key: 'amazonAverageRating',
        newValue: 4.5,
      },
    ]
    jest.clearAllMocks()
  })

  describe('render', () => {
    it('should render as expected', () => {
      const { asFragment } = render(
        <Provider store={store}>
          <MuiThemeProvider theme={muiTheme}>
            <SearchBar />
          </MuiThemeProvider>
        </Provider>
      )
      expect(asFragment()).toMatchSnapshot()
    })
  })
  describe('search button', () => {
    it('is enabled when the search bar has a value', async () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <MuiThemeProvider theme={muiTheme}>
            <SearchBar />
          </MuiThemeProvider>
        </Provider>
      )
      await wait(() => {
        fireEvent.change(getByTestId('searchBar'), {
          target: { value: '123' },
        })
      })

      expect(getByTestId('searchButton')).not.toBeDisabled()
    })
    it('is disabled when the search bar is empty', async () => {
      const { getByTestId } = render(
        <Provider store={store}>
          <MuiThemeProvider theme={muiTheme}>
            <SearchBar />
          </MuiThemeProvider>
        </Provider>
      )
      await wait(() => {
        fireEvent.change(getByTestId('searchBar'), { target: { value: '' } })
      })

      expect(getByTestId('searchButton')).toBeDisabled()
    })
  })
  describe('handleSearch', () => {
    describe('validation', () => {
      it('does not call (search) if there are no promise isbns', async () => {
        const { getByTestId } = render(
          <Provider store={store}>
            <MuiThemeProvider theme={muiTheme}>
              <SearchBar {...props} />
            </MuiThemeProvider>
          </Provider>
        )
        await wait(() => {
          fireEvent.change(getByTestId('searchBar'), {
            target: { value: '123' },
          })
        })
        await wait(() => {
          fireEvent.click(getByTestId('searchButton'))
        })
        expect(props.setBooklist).not.toHaveBeenCalled()
      })
      it('does not include an isbn that is not valid', async () => {
        const { getByTestId } = render(
          <Provider store={store}>
            <MuiThemeProvider theme={muiTheme}>
              <SearchBar {...props} />
            </MuiThemeProvider>
          </Provider>
        )
        await wait(() => {
          fireEvent.change(getByTestId('searchBar'), {
            target: { value: '123,9781402218279' },
          })
        })
        await wait(() => {
          fireEvent.click(getByTestId('searchButton'))
        })
        expect(props.setBooklist.mock.calls).toMatchSnapshot()
      })
      it('can add a new book to the booklist on additional search', async () => {
        props = {
          ...props,
          booklist: [{ title: 'book1', isbn: '0123456789012' }],
        }

        const { getByTestId } = render(
          <Provider store={store}>
            <MuiThemeProvider theme={muiTheme}>
              <SearchBar {...props} />
            </MuiThemeProvider>
          </Provider>
        )
        await wait(() => {
          fireEvent.change(getByTestId('searchBar'), {
            target: { value: '9781402218279' },
          })
        })
        await wait(() => {
          fireEvent.click(getByTestId('searchButton'))
        })
        expect(props.setBooklist.mock.calls).toMatchSnapshot()
      })
      it('does not add a new book to the booklist if it already exists', async () => {
        props = { ...props, booklist: [{ isbn: '9781402218279' }] }

        const { getByTestId } = render(
          <Provider store={store}>
            <MuiThemeProvider theme={muiTheme}>
              <SearchBar {...props} />
            </MuiThemeProvider>
          </Provider>
        )
        await wait(() => {
          fireEvent.change(getByTestId('searchBar'), {
            target: { value: '9781402218279' },
          })
        })
        await wait(() => {
          fireEvent.click(getByTestId('searchButton'))
        })
        expect(props.setBooklist).not.toHaveBeenCalled()
      })
    })
    describe('setBooklist', () => {
      it('returns correct booklist if there are no books in bookshelf', async () => {
        const { getByTestId } = render(
          <Provider store={store}>
            <MuiThemeProvider theme={muiTheme}>
              <SearchBar {...props} />
            </MuiThemeProvider>
          </Provider>
        )
        await wait(() => {
          fireEvent.change(getByTestId('searchBar'), {
            target: { value: '9781402218279' },
          })
        })
        await wait(() => {
          fireEvent.click(getByTestId('searchButton'))
        })
        expect(props.setBooklist.mock.calls).toMatchSnapshot()
      })
      it('returns correct booklist if there are books, but no duplicates in bookshelf', async () => {
        store = mockStore({
          bookshelf: { bookshelf: [{ isbn: '1234' }] },
        })
        store.dispatch = jest.fn()

        const { getByTestId } = render(
          <Provider store={store}>
            <MuiThemeProvider theme={muiTheme}>
              <SearchBar {...props} />
            </MuiThemeProvider>
          </Provider>
        )
        await wait(() => {
          fireEvent.change(getByTestId('searchBar'), {
            target: { value: '9781402218279' },
          })
        })
        await wait(() => {
          fireEvent.click(getByTestId('searchButton'))
        })
        expect(props.setBooklist.mock.calls).toMatchSnapshot()
      })
      it('returns correct booklist if there are books, and a duplicate book in bookshelf with differences', async () => {
        store = mockStore({
          bookshelf: {
            bookshelf: [{ isbn: '9781402218279', amazonAverageRating: 3.9 }],
          },
        })
        store.dispatch = jest.fn()

        const { getByTestId } = render(
          <Provider store={store}>
            <MuiThemeProvider theme={muiTheme}>
              <SearchBar {...props} />
            </MuiThemeProvider>
          </Provider>
        )
        await wait(() => {
          fireEvent.change(getByTestId('searchBar'), {
            target: { value: '9781402218279' },
          })
        })
        await wait(() => {
          fireEvent.click(getByTestId('searchButton'))
        })
        expect(props.setBooklist.mock.calls).toMatchSnapshot()
      })
    })
  })
  describe('handleSave', () => {
    it('button is hidden if booklist is empty', () => {
      const { asFragment } = render(
        <Provider store={store}>
          <MuiThemeProvider theme={muiTheme}>
            <SearchBar {...props} />
          </MuiThemeProvider>
        </Provider>
      )

      expect(asFragment()).toMatchSnapshot()
    })
    it('button is visible if booklist is not empty', () => {
      props = Object.assign({}, props, { booklist: [{ title: 'book title' }] })
      const { getByTestId } = render(
        <Provider store={store}>
          <MuiThemeProvider theme={muiTheme}>
            <SearchBar {...props} />
          </MuiThemeProvider>
        </Provider>
      )

      expect(getByTestId('saveButton')).toBeVisible()
    })
    it('calls addBookshelfService and does not call updateBookshelfService if there are no books with differences', async () => {
      props = Object.assign({}, props, { booklist: [book] })
      const { getByTestId } = render(
        <Provider store={store}>
          <MuiThemeProvider theme={muiTheme}>
            <SearchBar {...props} />
          </MuiThemeProvider>
        </Provider>
      )

      await wait(() => {
        fireEvent.click(getByTestId('saveButton'))
      })

      addBookshelfService.mockReturnValue(true)
      expect(updateBooksBookshelfService).not.toHaveBeenCalled()
      expect(addBookshelfService.mock.calls).toMatchSnapshot()
      expect(addBookshelfService).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledTimes(1)
    })
    it('does not call addBookshelfService but calls updateBooksBookshelfService with booklist containing only books with differences', async () => {
      book = Object.assign({}, book, { differences })
      props = Object.assign({}, props, { booklist: [book] })

      const { getByTestId } = render(
        <Provider store={store}>
          <MuiThemeProvider theme={muiTheme}>
            <SearchBar {...props} />
          </MuiThemeProvider>
        </Provider>
      )

      await wait(() => {
        fireEvent.click(getByTestId('saveButton'))
      })

      expect(updateBooksBookshelfService.mock.calls).toMatchSnapshot()
      expect(updateBooksBookshelfService).toHaveBeenCalledTimes(1)
      expect(addBookshelfService).not.toHaveBeenCalled()
      expect(store.dispatch).toHaveBeenCalledTimes(1)
    })
    it('calls both addBookshelfService and updateBooksBookshelfService with booklist containing books with and without differences', async () => {
      book = Object.assign({}, book, { differences })
      props = Object.assign({}, props, {
        booklist: [
          book,
          {
            isbn: '000',
            id: '999',
            differences: [
              {
                currentValue: 400,
                key: 'goodreadsRatingsCount',
                newValue: 500,
              },
              {
                currentValue: 100,
                key: 'amazonRatingsCount',
                newValue: 200,
              },
            ],
          },
          { title: 'book title', isbn: '1234' },
        ],
      })

      const { getByTestId } = render(
        <Provider store={store}>
          <MuiThemeProvider theme={muiTheme}>
            <SearchBar {...props} />
          </MuiThemeProvider>
        </Provider>
      )

      await wait(() => {
        fireEvent.click(getByTestId('saveButton'))
      })

      expect(updateBooksBookshelfService.mock.calls).toMatchSnapshot()
      expect(updateBooksBookshelfService).toHaveBeenCalledTimes(1)
      expect(addBookshelfService.mock.calls).toMatchSnapshot()
      expect(addBookshelfService).toHaveBeenCalledTimes(1)
      expect(store.dispatch).toHaveBeenCalledTimes(1)
    })
  })
})
