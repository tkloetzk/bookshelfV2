import Grid from "@material-ui/core/Grid";
import React from "react";
import Textfield from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import isEmpty from "lodash/isEmpty";
import isIsbn from "is-isbn";
import forEach from "lodash/forEach";

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(2),
    margin: 0,
    width: "100%"
  }
}));

export default function SearchBar() {
  const classes = useStyles();
  const [searchedISBNs, setSearchedISBNs] = React.useState("");

  function handleSearch() {
    const isbns = searchedISBNs.split(/[\n, ]/).filter(v => v !== "");

    const promiseISBNs = [];
    forEach(isbns, isbn => {
      const formattedIsbn = isbn.replace(/[- ]/g, "");
      if (isIsbn.validate(formattedIsbn)) {
        promiseISBNs.push(formattedIsbn);
      }
    });

    // if (promiseISBNs.length) {
    //   Promise.all(map(promiseISBNs, (isbn) => {
    //     // getBook(isbn)
    //   }));
    // }
  }
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      spacing={4}
      className={classes.container}
      data-testid="searchView"
    >
      <Grid item xs={8}>
        <Textfield
          value={searchedISBNs}
          onChange={event => setSearchedISBNs(event.target.value)}
          multiline
          variant="outlined"
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
          onClick={handleSearch}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
}
