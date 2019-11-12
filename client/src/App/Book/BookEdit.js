import React from 'react'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import SaveIcon from '@material-ui/icons/Save'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import FormLabel from '@material-ui/core/FormLabel'
import CancelIcon from '@material-ui/icons/Cancel'
import compareDifferences from '../../util/compareDifferences'

const useStyles = makeStyles(theme => ({
  card: {
    width: 235,
    maxHeight: 459,
    display: 'flex',
    flexDirection: 'column',
    margin: 13,
  },
  autoCompleteRoot: {
    height: 90,
    overflowX: 'scroll',
  },
  text: {
    fontSize: '12px',
  },
}))

export default function Book({ book, setEditMode, handleSave }) {
  const classes = useStyles()
  const [bookEdit, setBookEdit] = React.useState(book)
  const genres = useSelector(state => state.bookshelf.genres)

  function setValue(e) {
    const newBookEdit = { ...bookEdit, [e.target.id]: e.target.value }
    setBookEdit(newBookEdit)
  }

  function handleEditSave() {
    const diff = compareDifferences(book, bookEdit, [], true)
    handleSave(bookEdit, diff)
    setEditMode(false)
  }

  function handleCancel() {
    setBookEdit(book)
    setEditMode(false)
  }

  return (
    <Card className={classes.card}>
      <Grid
        container
        justify="center"
        style={{ height: '100%', overflowX: 'scroll' }}
      >
        <Grid item xs={10}>
          <TextField
            value={bookEdit.title}
            fullWidth
            id="title"
            label="Title"
            margin="dense"
            onChange={setValue}
            inputProps={{
              style: { fontSize: 12 },
              'data-testid': 'titleTextBar',
            }}
          />
        </Grid>
        <Grid item xs={10}>
          <FormLabel component="label" className={classes.text}>
            Categories
          </FormLabel>
          <Autocomplete
            multiple
            options={genres.map(genre => genre.value)}
            defaultValue={bookEdit.categories}
            freeSolo
            id="categories"
            filterSelectedOptions
            disableCloseOnSelect
            onChange={(e, value) =>
              setValue({ target: { id: 'categories', value } })
            }
            renderInput={params => (
              <TextField
                {...params}
                margin="dense"
                fullWidth
                multiline={false}
                classes={{ root: classes.autoCompleteRoot }}
              />
            )}
          />
        </Grid>
        <Grid item xs={10}>
          <TextField
            multiline
            value={bookEdit.description}
            fullWidth
            rowsMax={4}
            id="description"
            label="Description"
            margin="dense"
            onChange={setValue}
            inputProps={{ style: { fontSize: 12 } }}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            value={bookEdit.amazonAverageRating}
            fullWidth
            type="number"
            id="amazonAverageRating"
            label="AZ Rating"
            margin="dense"
            onChange={setValue}
            inputProps={{ style: { fontSize: 12 }, step: 0.1 }}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            value={bookEdit.goodreadsAverageRating}
            fullWidth
            type="number"
            id="goodreadsAverageRating"
            label="GR Rating"
            margin="dense"
            onChange={setValue}
            inputProps={{ style: { fontSize: 12 }, step: 0.1 }}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            value={bookEdit.amazonRatingsCount}
            fullWidth
            type="number"
            id="amazonRatingsCount"
            label="AZ Reviews"
            margin="dense"
            onChange={setValue}
            inputProps={{ style: { fontSize: 12 } }}
          />
        </Grid>
        <Grid item xs={5}>
          <TextField
            value={bookEdit.goodreadsRatingsCount}
            fullWidth
            type="number"
            id="goodreadsRatingsCount"
            label="GR Reviews"
            margin="dense"
            onChange={setValue}
            inputProps={{ style: { fontSize: 12 } }}
          />
        </Grid>
        <Grid container justify="flex-end" alignItems="flex-end">
          <Grid item xs={5}>
            <IconButton data-testid="saveButton" onClick={handleEditSave}>
              <SaveIcon />
            </IconButton>
          </Grid>
          <Grid item xs={5}>
            <IconButton data-testid="cancelButton" onClick={handleCancel}>
              <CancelIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}
