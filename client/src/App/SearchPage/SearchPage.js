import Grid from '@material-ui/core/Grid'
import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { useSelector } from 'react-redux'
import Results from '../Results/Results'
import SearchBar from './SearchBar/SearchBar'
import remove from 'lodash/remove'

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

  function handleSave(book) {
    remove(booklist, {
      isbn: book.isbn,
    })
    setBooklist([...booklist, book])
  }

  function handleDelete(book) {
    remove(booklist, {
      isbn: book.isbn,
    })
    setBooklist([...booklist])
  }

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      spacing={4}
      className={classes.container}
      data-testid="searchView"
    >
      <SearchBar
        setBooklist={setBooklist}
        bookshelf={bookshelf}
        booklist={booklist}
      />
      <Grid item xs={12}>
        <Results
          booklist={booklist}
          handleSave={handleSave}
          handleDelete={handleDelete}
        />
      </Grid>
    </Grid>
  )
}
