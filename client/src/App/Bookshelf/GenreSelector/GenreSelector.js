import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { useDispatch, useSelector } from 'react-redux'
import Checkbox from '@material-ui/core/Checkbox'
import map from 'lodash/map'
import Select from 'react-select'
import { getGenres } from '../../../store/bookshelf/bookshelfActions'
import Chip from '@material-ui/core/Chip'
import CancelIcon from '@material-ui/icons/Cancel'
import { SELECTED_GENRES } from '../../../store/bookshelf/bookshelfActionTypes'

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

export default function GenreSelector() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const genres = useSelector(state => state.bookshelf.genres)
  const [selectedGenres, setSelectedGenres] = React.useState([])

  useEffect(() => {
    dispatch(getGenres())
  }, [])

  function handleChange(value) {
    setSelectedGenres(value)

    const genres = map(value, genre => genre.value)

    dispatch({
      type: SELECTED_GENRES,
      selectedGenres: genres,
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
        <ButtonGroup size="medium" aria-label="AND/OR genres">
          <Button>AND</Button>
          <Button>OR</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  )
}
