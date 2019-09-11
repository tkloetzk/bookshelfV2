import React from 'react';
import Search from './Search/Search';
import SwipeableViews from 'react-swipeable-views';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { makeStyles } from '@material-ui/styles';
import Header from './header/Header';

const useStyles = makeStyles(theme => ({
  tabs: {
    background: theme.palette.primary.gray,
  },
  container: {
    marginTop: 103,
  },
}));

export default function App() {
  const classes = useStyles();
  const [index, setIndex] = React.useState(0);

  function handleChangeIndex(newValue) {
    setIndex(newValue);
  }

  return (
    <>
      <Header>Book Review Aggregator</Header>
      <div className={classes.container}>
        <Tabs
          value={index}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          className={classes.tabs}
        >
          <Tab
            label="Search"
            id="searchTab"
            onClick={() => handleChangeIndex(0)}
          />
          <Tab
            label="Bookshelf"
            id="bookshelfTab"
            onClick={() => handleChangeIndex(1)}
          />
        </Tabs>
        <SwipeableViews
          index={index}
          onChangeIndex={handleChangeIndex}
        >
          <Search />
          <div>Test2</div>
        </SwipeableViews>
      </div>
    </>
  );
}
