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

export default function SearchPage({ setBooklist }) {
  const bookshelf = useSelector(state => state.bookshelf.bookshelf)
  const [searchedISBNs, setSearchedISBNs] = React.useState('')

  async function handleSearch() {
    const isbns = searchedISBNs.split(/[\n, ]/).filter(v => v !== '')

    const promiseISBNs = []
    forEach(isbns, isbn => {
      const formattedIsbn = isbn.replace(/[- ]/g, '')
      if (isIsbn.validate(formattedIsbn)) {
        promiseISBNs.push(formattedIsbn)
      }
    })

    if (!promiseISBNs.length) return

    setSearchedISBNs([])
    const books = await search(union(promiseISBNs))

    const booklist = forEach(books, searchedBook => {
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
    setBooklist(booklist)
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
          disabled={isEmpty(searchedISBNs)}
          data-testid="searchButton"
          onClick={handleSearch}
        >
          Search
        </Button>
      </Grid>
    </>
  )
}
