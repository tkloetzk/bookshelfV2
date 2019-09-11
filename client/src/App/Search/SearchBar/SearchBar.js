import Grid from '@material-ui/core/Grid'
import React from 'react';
import Textfield from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button'
import isEmpty from 'lodash/isEmpty'

const useStyles = makeStyles(theme => ({
    container: {
      padding: theme.spacing(2),
      margin: 0,
      width: '100%',
    },
  }));

export default function SearchBar() {
  const classes = useStyles();
  const [searchedISBNs, setSearchedISBNs] = React.useState('');

  return (
    <Grid container justify="center" alignItems="center" spacing={4} className={classes.container}>
      <Grid item xs={8} >
        <Textfield 
          value={searchedISBNs}
          onChange={(event) => setSearchedISBNs(event.target.value)}
          multiline 
          variant={"outlined"} 
          fullWidth
          inputProps={{ "data-testid": "searchBar" }}
          />
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="outlined"
          color="primary"
          disabled={isEmpty(searchedISBNs)}
          data-testid="searchButton"
        >
          Search
        </Button>
      </Grid>
    </Grid>
  )
}
