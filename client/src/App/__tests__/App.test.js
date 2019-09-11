import { MuiThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { mount } from 'enzyme';
import muiTheme from '../../config/themeConfig';
import App from '../App';

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('render', () => {
    it('should render as expected', () => {
      expect(component.html()).toMatchSnapshot();
    });
  });

  describe('handleChangeIndex', () => {
    it('updates the index when clicking the bookshelf tab', () => {
      component
        .find('#bookshelfTab')
        .hostNodes()
        .props()
        .onClick();
      expect(setState).toHaveBeenCalledWith(1);
    });
    it('updates the index when clicking the search tab', () => {
      component
        .find('#searchTab')
        .hostNodes()
        .props()
        .onClick();
      expect(setState).toHaveBeenCalledWith(0);
    });
  });
});
