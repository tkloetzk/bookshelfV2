import React from 'react'
import SwipeableViews from 'react-swipeable-views'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import { makeStyles } from '@material-ui/styles'
import Search from './Search/Search'
import Header from './header/Header'

const useStyles = makeStyles((theme) => ({
  tabs: {
    background: theme.palette.primary.gray,
  },
  container: {
    marginTop: 103,
  },
}))

export default function App() {
  const classes = useStyles()
  const [index, setIndex] = React.useState(0)

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
            data-testid="searchTab"
            onClick={() => setIndex(0)}
          />
          <Tab
            label="Bookshelf"
            data-testid="bookshelfTab"
            onClick={() => setIndex(1)}
          />
        </Tabs>
        <SwipeableViews index={index} onChangeIndex={setIndex}>
          <Search />
          <div data-testid="bookshelfView">Test2</div>
        </SwipeableViews>
      </div>
    </>
  )
}
