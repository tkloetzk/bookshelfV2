import React from 'react'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import SaveIcon from '@material-ui/icons/Save'
import compareDifferences from '../../util/compareDifferences'
import { updateBooksBookshelfService } from '../../services/bookshelfService'
import map from 'lodash/map'
import assign from 'lodash/assign'

export default function Book({ book, classes, setEditMode, handleSave }) {
  const [bookEdit, setBookEdit] = React.useState(book)

  function setValue(e) {
    const newBookEdit = Object.assign({}, bookEdit, {
      [e.target.id]: e.target.value,
    })
    setBookEdit(newBookEdit)
  }

  function handleEditSave() {
    const diff = compareDifferences(book, bookEdit, [], true)
    handleSave(book, diff)
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
        <Grid item xs={6}>
          <IconButton data-testid="saveButton" onClick={handleEditSave}>
            <SaveIcon />
          </IconButton>
          <IconButton data-testid="cancelButton" onClick={handleCancel}>
            <SaveIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Card>
  )
}
