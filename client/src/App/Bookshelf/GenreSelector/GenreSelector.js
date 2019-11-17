import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { useDispatch, useSelector } from 'react-redux'
import map from 'lodash/map'
import Select from 'react-select'
import Chip from '@material-ui/core/Chip'
import CancelIcon from '@material-ui/icons/Cancel'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import cloneDeep from 'lodash/cloneDeep'
import { getGenres } from '../../../store/bookshelf/bookshelfActions'

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1),
    margin: 0,
    width: '100%',
  },
  legend: {
    alignSelf: 'center',
    paddingRight: '10px',
  },
  formGroup: {
    justifyContent: 'center',
  },
}))

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  )
}

const components = {
  MultiValue,
}

export default function GenreSelector({ setBookshelfFiltered }) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const bookshelf = useSelector(state => state.bookshelf.bookshelf)
  const genres = useSelector(state => state.bookshelf.genres)
  const [selectedGenres, setSelectedGenres] = React.useState([])
  const [selector, setSelector] = React.useState('OR')
  const [filters, setFilters] = React.useState([])

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])

  useEffect(() => {
    setBookshelfFiltered(bookshelf)
  }, [bookshelf, setBookshelfFiltered])

  useEffect(() => {
    let filteredBooks = cloneDeep(bookshelf)
    const selectedGenresValue = map(selectedGenres, genre => genre.value)

    if (selectedGenresValue.length > 0) {
      filteredBooks = bookshelf.filter(function(book) {
        if (selector === 'AND') {
          return selectedGenresValue.every(v => book.categories.includes(v))
        }
        return selectedGenresValue.some(r => book.categories.includes(r))
      })
    }
    filteredBooks = filteredBooks.filter(function(book) {
      return filters.every(v => book[v] === true)
    })

    setBookshelfFiltered(filteredBooks)
  }, [selectedGenres, selector, filters, bookshelf, setBookshelfFiltered])

  return (
    genres.length > 0 && (
      <Grid
        container
        justify="center"
        alignItems="center"
        spacing={4}
        className={classes.container}
      >
        <Grid item xs={2}>
          <ToggleButtonGroup
            onChange={(e, value) => setFilters(value)}
            value={filters}
            aria-label="OWNED/UNREAD genres"
            size="small"
          >
            <ToggleButton value="owned" aria-label="OWNED">
              OWNED
            </ToggleButton>
            <ToggleButton value="unread" aria-label="UNREAD">
              UNREAD
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={6}>
          <Select
            classes={classes}
            components={components}
            value={selectedGenres}
            onChange={setSelectedGenres}
            options={genres}
            isMulti
          />
        </Grid>
        <Grid item xs={2}>
          <ToggleButtonGroup
            onChange={(e, value) => setSelector(value)}
            value={selector}
            aria-label="AND/OR genres"
            exclusive
            size="small"
          >
            <ToggleButton
              value="OR"
              aria-label="OR"
              data-testid="orFilterButton"
            >
              OR
            </ToggleButton>
            <ToggleButton
              value="AND"
              aria-label="AND"
              data-testid="andFilterButton"
            >
              AND
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
    )
  )
}
