import { MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App/App'
import muiTheme from './config/themeConfig'
import configureStore from './store/configureStore'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
