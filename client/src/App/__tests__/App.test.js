import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { mount } from 'enzyme';
import muiTheme from '../../config/themeConfig';
import App from '../App';
import { render, cleanup, fireEvent, getByTestId, waitForDomChange, wait, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

describe('App', () => {
  let component;

  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation(init => [init, setState]);

  beforeEach(() => {
    component = mount(
      <MuiThemeProvider theme={muiTheme}>
        <App />
      </MuiThemeProvider>,
    ).find('App');
  });

  afterEach(cleanup)

  describe('render', () => {
    it('should render as expected', () => {
      const { asFragment } = render(<MuiThemeProvider theme={muiTheme}>
        <App />
        </MuiThemeProvider>)
      expect(asFragment()).toMatchSnapshot()    });
  });
});
