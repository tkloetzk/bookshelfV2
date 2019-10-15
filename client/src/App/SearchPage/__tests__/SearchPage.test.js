import { MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import { fireEvent, render, wait } from '@testing-library/react'
import muiTheme from '../../../config/themeConfig'
import SearchPage from '../SearchPage'

describe('SearchPage', () => {
  describe('render', () => {
    it('should render as expected', () => {
      const { asFragment } = render(
        <MuiThemeProvider theme={muiTheme}>
          <SearchPage />
        </MuiThemeProvider>
      )
      expect(asFragment()).toMatchSnapshot()
    })
  })
  describe('search button', () => {
    it('is enabled when the search bar has a value', async () => {
      const { getByTestId } = render(
        <MuiThemeProvider theme={muiTheme}>
          <SearchPage />
        </MuiThemeProvider>
      )
      await wait(() => {
        fireEvent.change(getByTestId('searchPage'), {
          target: { value: '123' },
        })
      })

      expect(getByTestId('searchButton')).not.toBeDisabled()
    })
    it('is disabled when the search bar is empty', async () => {
      const { getByTestId } = render(
        <MuiThemeProvider theme={muiTheme}>
          <SearchPage />
        </MuiThemeProvider>
      )
      await wait(() => {
        fireEvent.change(getByTestId('searchPage'), { target: { value: '' } })
      })

      expect(getByTestId('searchButton')).toBeDisabled()
    })
  })
})