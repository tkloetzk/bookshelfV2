import React from 'react'
import Textfield from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import isEmpty from 'lodash/isEmpty'
import isIsbn from 'is-isbn'
import forEach from 'lodash/forEach'
import union from 'lodash/union'
import Grid from '@material-ui/core/Grid'
import { useDispatch, useSelector } from 'react-redux'
import find from 'lodash/find'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/styles'
import Fab from '@material-ui/core/Fab'
import SaveIcon from '@material-ui/icons/Save'
import has from 'lodash/has'
import remove from 'lodash/remove'
import assign from 'lodash/assign'
import map from 'lodash/map'
import cloneDeep from 'lodash/cloneDeep'
import {
  addBookshelfService,
  updateBooksBookshelfService,
} from '../../../services/bookshelfService'
import compareDifferences from '../../../util/compareDifferences'
import search from '../../../services/searchService'
import { getBookshelf } from '../../../store/bookshelf/bookshelfActions'
import LOADING_STATUSES from '../../../util/constants'
import Notification from '../../Notification/Notification'

const useStyles = makeStyles(() => ({
  buttonProgress: {
    color: 'green',
    position: 'relative',
    marginLeft: -59,
    top: 7,
  },
  fab: {
    alignSelf: 'center',
    marginLeft: '10px',
  },
}))

export default function SearchPage({ setBooklist, booklist = [] }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const bookshelf = useSelector(state => state.bookshelf.bookshelf)
  const [searchedISBNs, setSearchedISBNs] = React.useState('')
  const [duplicateNoDifferences, setDuplicateNoDifferences] = React.useState([])
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

    const searchedList = forEach(books, searchedBook => {
      return forEach(bookshelf, existingBook => {
        if (searchedBook.isbn === existingBook.isbn) {
          searchedBook.id = existingBook._id
          searchedBook.differences = compareDifferences(
            existingBook,
            searchedBook,
            []
          )
        }
      })
    })

    const duplicated = remove(searchedList, book => {
      if (has(book, 'differences') && isEmpty(book.differences)) return book
    })

    setDuplicateNoDifferences(map(duplicated, book => book.isbn))
    setBooklist([...booklist, ...searchedList])
    setLoading(false)
  }

  async function handleSave() {
    const booklistCopy = cloneDeep(booklist)
    const modifiedBooksArray = []

    forEach(booklist, book => {
      if (has(book, 'differences')) {
        const fields = map(book.differences, diff => {
          return { [diff.key]: diff.newValue }
        })

        modifiedBooksArray.push({ id: book.id, fields: assign(...fields) })
        remove(booklistCopy, {
          isbn: book.isbn,
        })
      }
    })

    const promiseArray = []
    if (!isEmpty(modifiedBooksArray))
      promiseArray.push(updateBooksBookshelfService(modifiedBooksArray))
    if (!isEmpty(booklistCopy))
      promiseArray.push(addBookshelfService(booklistCopy))
    await Promise.all(promiseArray)
    dispatch(getBookshelf())
    setBooklist([])
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
      <Grid item lg={2}>
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
        {booklist.length > 0 && (
          <Fab
            color="primary"
            aria-label="Save"
            className={classes.fab}
            onClick={handleSave}
            component="button"
            data-testid="saveButton"
          >
            <SaveIcon />
          </Fab>
        )}
        <Notification
          // open={true}
          open={!!duplicateNoDifferences.length}
          handleClose={() => setDuplicateNoDifferences([])}
          autoHideDuration={3500}
          message={`${duplicateNoDifferences.join(
            ', '
          )} already shelved with no differences`}
          type={LOADING_STATUSES.info}
        />
      </Grid>
    </>
  )
}
