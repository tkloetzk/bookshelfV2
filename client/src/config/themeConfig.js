import { createMuiTheme } from '@material-ui/core/styles'

export const primary = {
    gray: '#D3D3D3',
    main: '#366cd9'
    // light: '#E0F3F4',
    // dark: '#006978',
    // action: '#333333',
    // contrastText: '#fff',
    // success: '#008300',
    // border: '1px solid #E6E6EB',
  }

const bookshelfTheme = createMuiTheme({
    palette: {
      primary,
    //   secondary: secondary,
    //   error: error,
    //   background: background,
    },
  })

  export default bookshelfTheme
