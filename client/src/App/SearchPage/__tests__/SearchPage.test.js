import { MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import { render } from '@testing-library/react'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import muiTheme from '../../../config/themeConfig'
import SearchPage from '../SearchPage'

const mockStore = configureMockStore()

describe('SearchPage', () => {
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
            <SearchPage />
          </MuiThemeProvider>
        </Provider>
      )
      expect(asFragment()).toMatchSnapshot()
    })
  })
})
