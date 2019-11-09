import React from 'react'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import SaveIcon from '@material-ui/icons/Save'
import compareDifferences from '../../util/compareDifferences'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  card: {
    width: 235,
    maxHeight: 459,
    display: 'flex',
    flexDirection: 'column',
    margin: 13,
  },
}))

export default function Book({ book, setEditMode, handleSave }) {
  const classes = useStyles()
  const [bookEdit, setBookEdit] = React.useState(book)
  const genres = useSelector(state => state.bookshelf.genres)

  function setValue(e) {
    console.log(e.target)
    const newBookEdit = Object.assign({}, bookEdit, {
      [e.target.id]: e.target.value,
    })
    setBookEdit(newBookEdit)
  }

  function handleEditSave() {
    const diff = compareDifferences(book, bookEdit, [], true)
    console.log(diff)
    handleSave(bookEdit, diff)
    setEditMode(false)
  }

  function handleCancel() {
    setBookEdit(book)
    setEditMode(false)
  }

  return (
    <Card className={classes.card}>
      <Grid container justify="center">
        <Grid item xs={10}>
          <TextField
            value={bookEdit.title}
            fullWidth
            id="title"
            label="Title"
            margin="dense"
            onChange={setValue}
            inputProps={{ style: { fontSize: 12 } }}
          />
        </Grid>
        <Grid item xs={10}>
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
                label="Categories"
                margin="dense"
                fullWidth
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
        <Grid container>
          <Grid item xs={6}>
            <IconButton data-testid="saveButton" onClick={handleEditSave}>
              <SaveIcon />
            </IconButton>
          </Grid>
          <Grid item xs={6}>
            <IconButton data-testid="cancelButton" onClick={handleCancel}>
              <SaveIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}
