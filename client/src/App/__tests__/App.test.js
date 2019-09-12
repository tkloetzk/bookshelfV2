import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import {
  render, cleanup,
} from '@testing-library/react';
import muiTheme from '../../config/themeConfig';
import App from '../App';
import '@testing-library/jest-dom/extend-expect';

describe('App', () => {
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  afterEach(cleanup);

  describe('render', () => {
    it('should render as expected', () => {
      const { asFragment } = render(
        <MuiThemeProvider theme={muiTheme}>
          <App />
        </MuiThemeProvider>,
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
