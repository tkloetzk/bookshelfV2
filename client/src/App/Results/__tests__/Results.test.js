import { MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import { render } from '@testing-library/react'
import muiTheme from '../../../config/themeConfig'
import Results from '../Results'
import '@testing-library/jest-dom/extend-expect'

describe('render', () => {
  let booklist
  beforeEach(() => {
    booklist = [
      {
        categories: ['Toddler', 'Parenting'],
        read: false,
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
      },
    ]
  })

  describe('renders', () => {
    it('should render as expected', () => {
      const { asFragment } = render(
        <MuiThemeProvider theme={muiTheme}>
          <Results booklist={booklist} />
        </MuiThemeProvider>
      )
      expect(asFragment()).toMatchSnapshot()
    })
  })
})
