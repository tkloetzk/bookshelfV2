import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {
  render,
  fireEvent,
  cleanup,
  wait,
  renderHook,
} from '@testing-library/react'
import { MuiThemeProvider } from '@material-ui/core/styles'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import muiTheme from '../../../../config/themeConfig'
import GenreSelector from '../GenreSelector'

const mockStore = configureMockStore()

describe('GenreSelector', () => {
  let book
  let props
  beforeEach(() => {
    props = {
      setBookshelfFiltered: jest.fn(),
    }
    book = {
      amazonAverageRating: 4.5,
      amazonRatingsCount: 553,
      categories: ['Parenting'],
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
    }
  })

  describe('render', () => {
    it('should render as expected with no genres', () => {
      const store = mockStore({
        bookshelf: { bookshelf: [], genres: [] },
      })
      store.dispatch = jest.fn()

      const { asFragment } = render(
        <Provider store={store}>
          <MuiThemeProvider theme={muiTheme}>
            <GenreSelector {...props} />
          </MuiThemeProvider>
        </Provider>
      )
      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(asFragment()).toMatchSnapshot()
    })
    it('should render as expected with genres', () => {
      const store = mockStore({
        bookshelf: {
          bookshelf: [],
          genres: ['Parenting', 'Newborn', 'Self-Help'],
        },
      })
      store.dispatch = jest.fn()

      const { asFragment } = render(
        <Provider store={store}>
          <MuiThemeProvider theme={muiTheme}>
            <GenreSelector {...props} />
          </MuiThemeProvider>
        </Provider>
      )
      expect(store.dispatch).toHaveBeenCalledTimes(1)
      expect(asFragment()).toMatchSnapshot()
    })
  })
  // describe('filters', () => {
  //   it('returns filters genres of an AND selector', async () => {
  //     const store = mockStore({
  //       bookshelf: {
  //         bookshelf: [
  //           book,
  //           {
  //             isbn: '1234',
  //             title: 'Test Title',
  //             categories: ['Parenting', 'Newborn'],
  //           },
  //         ],
  //         genres: ['Parenting', 'Newborn', 'Self-Help'],
  //       },
  //     })
  //     store.dispatch = jest.fn()

  //     const { asFragment, getByTestId } = render(
  //       <Provider store={store}>
  //         <MuiThemeProvider theme={muiTheme}>
  //           <GenreSelector {...props} />
  //         </MuiThemeProvider>
  //       </Provider>
  //     )

  //     expect(wrapper.state('openIndex')).toBe(0)

  // await wait(() => {
  //   fireEvent.change(getByTestId('selectGenres'), {
  //     target: { value: [{ label: 'Religion', value: 'Religion' }] },
  //   })

  //   fireEvent.click(getByTestId('andButton'))
  // })

  // expect(asFragment()).toMatchSnapshot()
  //   })
  // })
  // describe('setBookshelfFiltered', () => {
  // it('is called when bookshelf prop changes', () => {
  //   const store = mockStore({
  //     bookshelf: {
  //       bookshelf: [],
  //       genres: ['Parenting', 'Newborn', 'Self-Help'],
  //     },
  //   })
  //   store.dispatch = jest.fn()

  //   const { asFragment, rerender } = render(
  //     <Provider store={store}>
  //       <MuiThemeProvider theme={muiTheme}>
  //         <GenreSelector {...props} />
  //       </MuiThemeProvider>
  //     </Provider>
  //   )

  //   const store2 = mockStore({
  //     bookshelf: {
  //       bookshelf: [book],
  //       genres: ['Parenting', 'Newborn', 'Self-Help'],
  //     },
  //   })
  //   store2.dispatch = jest.fn()
  //   rerender(
  //     <Provider store={store2}>
  //       <MuiThemeProvider theme={muiTheme}>
  //         <GenreSelector {...props} />
  //       </MuiThemeProvider>
  //     </Provider>
  //   )
  //   expect(props.setBookshelfFiltered).toHaveBeenCalledTimes(0)
  // })
  // })
})
