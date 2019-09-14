import { MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import {
  render, cleanup, fireEvent, wait,
} from '@testing-library/react'
import muiTheme from '../../config/themeConfig'
import App from '../App'
import '@testing-library/jest-dom/extend-expect'

describe('App', () => {
  afterEach(cleanup)

  describe('render', () => {
    it('should render as expected', () => {
      const { asFragment } = render(
        <MuiThemeProvider theme={muiTheme}>
          <App />
        </MuiThemeProvider>,
      )
      expect(asFragment()).toMatchSnapshot()
    })
  })

  describe('tabs', () => {
    it('should show Search when search tab is clicked', async () => {
      const { asFragment, getByTestId } = render(
        <MuiThemeProvider theme={muiTheme}>
          <App />
        </MuiThemeProvider>,
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
        <MuiThemeProvider theme={muiTheme}>
          <App />
        </MuiThemeProvider>,
      )

      await wait(() => {
        fireEvent.click(getByTestId('bookshelfTab'))
      })

      expect(asFragment()).toMatchSnapshot()
    })
  })
})
