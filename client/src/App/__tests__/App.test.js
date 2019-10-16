import { MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import { render, fireEvent, wait } from '@testing-library/react'
import muiTheme from '../../config/themeConfig'
import App from '../App'
import '@testing-library/jest-dom/extend-expect'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'

const mockStore = configureMockStore()

describe('App', () => {
  let store
  beforeEach(() => {
    store = mockStore({
      bookshelf: { bookshelf: [] },
    })
    store.dispatch = jest.fn()
  })

  describe('render', () => {
    it('should render as expected', () => {
      const { asFragment } = render(
        <Provider store={store}>
          <MuiThemeProvider theme={muiTheme}>
            <App />
          </MuiThemeProvider>
        </Provider>
      )
      expect(asFragment()).toMatchSnapshot()
    })
  })

  describe('tabs', () => {
    it('should show Search when search tab is clicked', async () => {
      const { asFragment, getByTestId } = render(
        <Provider store={store}>
          <MuiThemeProvider theme={muiTheme}>
            <App />
          </MuiThemeProvider>
        </Provider>
      )

      await wait(() => {
        fireEvent.click(getByTestId('bookshelfTab'))
      })

      await wait(() => {
        fireEvent.click(getByTestId('searchTab'))
      })

      expect(asFragment()).toMatchSnapshot()
    })
    it('should show Bookshelf when bookshelf tab is clicked', async () => {
      const { asFragment, getByTestId } = render(
        <Provider store={store}>
          <MuiThemeProvider theme={muiTheme}>
            <App />
          </MuiThemeProvider>
        </Provider>
      )

      await wait(() => {
        fireEvent.click(getByTestId('bookshelfTab'))
      })

      expect(asFragment()).toMatchSnapshot()
    })
  })
})
