import { MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import { fireEvent, render, wait } from '@testing-library/react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import muiTheme from '../../../../config/themeConfig'
import SearchBar from '../SearchBar'
import '@testing-library/jest-dom/extend-expect'

const mockStore = configureMockStore()

describe('SearchBar', () => {
  let store
  beforeEach(() => {
    store = mockStore({
      bookshelf: { bookshelf: [] },
    })
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
    let props

    beforeEach(() => {
      props = { setBooklist: jest.fn(), booklist: [] }
    })
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
        props = Object.assign({}, props, {
          booklist: [{ title: 'book1', isbn: '0123456789012' }],
        })

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
        props = Object.assign({}, props, {
          booklist: [{ isbn: '9781402218279' }],
        })

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
})
