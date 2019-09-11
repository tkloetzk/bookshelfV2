import React from 'react';
import { mount } from 'enzyme';
import SearchBar from '../SearchBar'
import { MuiThemeProvider } from '@material-ui/core/styles';
import muiTheme from '../../../../config/themeConfig';
import { render, cleanup, fireEvent, getByTestId } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('SearchBar', () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation(init => [init, setState]);

  afterEach(cleanup)

  const setup = () => {
    const utils = render(<MuiThemeProvider theme={muiTheme}>
        <SearchBar />
        </MuiThemeProvider>)
    const searchBar = utils.getByTestId('searchBar')
    const searchButton = utils.getByTestId('searchButton')

    return {
      searchBar,
      searchButton,
      ...utils,
    }
  }

  describe('render', () => {
    it('should render as expected', () => {
      const { asFragment } = render(<MuiThemeProvider theme={muiTheme}>
        <SearchBar />
        </MuiThemeProvider>)
      expect(asFragment()).toMatchSnapshot()
    });
  });
//   describe('search bar', () => {
//       it('updates state', () => {
        
// //             component
// //             .find('#searchBar').hostNodes().simulate('change', {target: {value: '1234'}})
// //             expect(setState).toHaveBeenCalledWith('1234');
            
// // console.log(component.find('#searchButton').hostNodes().props())
// // expect(component.find('#searchButton').hostNodes().props().disabled).toBe(false)
//         //     expect(component.state('searchedISBNs')).toBe(0)
//         //    console.log(component
//         //     .find('#searchButton')
//         //     .hostNodes().html())
//       })
//   })
//   describe('search button', () => {
//       it('is disabled when there are no isbns being searched', () => {
//         const { container } = render(<MuiThemeProvider theme={muiTheme}>
//             <SearchBar />
//             </MuiThemeProvider>)
//             fireEvent.change(getByTestId(container, 'searchBar'), {target: {value: '1234'}})
//             expect(getByTestId(container, 'searchButton')).toBeDisabled()
//      //   expect(searchButton).toBeDisabled()
//       })
//   })
})