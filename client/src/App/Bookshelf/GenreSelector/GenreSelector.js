import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { useDispatch, useSelector } from 'react-redux'
import map from 'lodash/map'
import Select from 'react-select'
import Chip from '@material-ui/core/Chip'
import CancelIcon from '@material-ui/icons/Cancel'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { SELECTED_GENRES } from '../../../store/bookshelf/bookshelfActionTypes'
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

export default function GenreSelector({
  setSelector,
  setFilters,
  selector,
  filters,
}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const genres = useSelector(state => state.bookshelf.genres)
  const [selectedGenres, setSelectedGenres] = React.useState([])

  useEffect(() => {
    dispatch(getGenres())
  }, [dispatch])

  function handleChange(value) {
    setSelectedGenres(value)

    const genreValues = map(value, genre => genre.value)

    dispatch({
      type: SELECTED_GENRES,
      selectedGenres: genreValues,
    })
  }

  return (
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
          aria-label="OWNED/READ genres"
          size="small"
        >
          <ToggleButton value="owned" aria-label="OWNED">
            OWNED
          </ToggleButton>
          <ToggleButton value="read" aria-label="READ">
            READ
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid item xs={6}>
        <Select
          classes={classes}
          components={components}
          value={selectedGenres}
          onChange={handleChange}
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
          <ToggleButton value="OR" aria-label="OR">
            OR
          </ToggleButton>
          <ToggleButton value="AND" aria-label="AND">
            AND
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
    </Grid>
  )
}
