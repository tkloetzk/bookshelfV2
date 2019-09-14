import React from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import Book from '../Book/Book'
import sortBooklist from '../../util/calculator'

const Results = ({ booklist }) => (
  <Grid container justify="center">
    {sortBooklist(booklist).map((book) => (
      <Book key={book.isbn} book={book} />
    ))}
  </Grid>
)

Results.propTypes = {
  booklist: PropTypes.arrayOf(PropTypes.shape).isRequired,
}
export default Results
