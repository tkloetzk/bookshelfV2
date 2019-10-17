import React from 'react'
import Textfield from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import isEmpty from 'lodash/isEmpty'
import isIsbn from 'is-isbn'
import forEach from 'lodash/forEach'
import union from 'lodash/union'
import Grid from '@material-ui/core/Grid'
import { useSelector } from 'react-redux'
import compareDifferences from '../../../util/compareDifferences'
import search from '../../../services/searchService'
import find from 'lodash/find'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  buttonProgress: {
    color: 'green',
    position: 'relative',
    marginLeft: -59,
    top: 7,
  },
}))

export default function SearchPage({ setBooklist, booklist }) {
  const classes = useStyles()
  const bookshelf = useSelector(state => state.bookshelf.bookshelf)
  const [searchedISBNs, setSearchedISBNs] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  async function handleSearch() {
    const isbns = searchedISBNs.split(/[\n,]/).filter(v => v !== '')

    const promiseISBNs = []
    forEach(isbns, isbn => {
      const formattedIsbn = isbn.replace(/[- ]/g, '')
      if (isIsbn.validate(formattedIsbn) && !find(booklist, { isbn })) {
        promiseISBNs.push(formattedIsbn)
      }
    })

    setSearchedISBNs([])
    if (!promiseISBNs.length) return

    setLoading(true)
    const books = await search(union(promiseISBNs))
    console.log(books)
    const searchedList = forEach(books, searchedBook => {
      return bookshelf.some(existingBook => {
        const searchedBookCopy = searchedBook
        if (searchedBook.isbn === existingBook.isbn) {
          searchedBookCopy.differences = compareDifferences(
            existingBook,
            searchedBookCopy,
            []
          )
        }
        return searchedBookCopy
      })
    })
    setBooklist([...booklist, ...searchedList])
    setLoading(false)
  }

  return (
    <>
      <Grid item xs={8}>
        <Textfield
          value={searchedISBNs}
          onChange={event => setSearchedISBNs(event.target.value)}
          multiline
          variant="outlined"
          fullWidth
          inputProps={{ 'data-testid': 'searchBar' }}
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="outlined"
          color="primary"
          disabled={loading || isEmpty(searchedISBNs)}
          data-testid="searchButton"
          onClick={handleSearch}
        >
          Search
        </Button>
        {loading && (
          <CircularProgress size={24} className={classes.buttonProgress} />
        )}
      </Grid>
    </>
  )
}
