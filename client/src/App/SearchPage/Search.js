import Grid from '@material-ui/core/Grid'
import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'
import Results from '../Results/Results'
import SearchBar from './SearchBar/SearchBar'

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    margin: 0,
    width: '100%',
  },
}))

export default function SearchPage() {
  const classes = useStyles()
  const [booklist, setBooklist] = React.useState([])
  const bookshelf = useSelector(state => state.bookshelf.bookshelf)

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      spacing={4}
      className={classes.container}
      data-testid="searchView"
    >
      <SearchBar setBooklist={setBooklist} bookshelf={bookshelf} />
      <Grid item xs={12}>
        <Results booklist={booklist} />
      </Grid>
    </Grid>
  )
}
