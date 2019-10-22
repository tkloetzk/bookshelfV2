import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import OwnedBook from '@material-ui/icons/Home'
import UnownedBook from '@material-ui/icons/HomeOutlined'
import { makeStyles } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'
import PropTypes from 'prop-types'
import CardActions from '@material-ui/core/CardActions'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import get from 'lodash/get'
import Icon from '@material-ui/icons/AnnouncementOutlined'
import ReactTooltip from 'react-tooltip'

const useStyles = makeStyles(theme => ({
  card: {
    width: 235,
    maxHeight: 459,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    margin: '13px',
  },
  different: {
    cursor: 'pointer',
    boxShadow:
      '0px 0px 3px 6px yellow, 0px 1px 1px 2px yellow, 0px 2px 1px 1px yellow',
  },
  header: {
    paddingBottom: '13px',
    width: '100%',
    maxHeight: '84px',
  },
  headerRead: {
    backgroundColor: theme.palette.primary.green,
  },
  headerUnread: {
    backgroundColor: theme.palette.primary.gray,
  },
  media: {
    width: '33%',
    paddingTop: '16px',
    minHeight: '116px',
  },
  iconButton: {
    alignSelf: 'flex-end',
    marginTop: 0,
  },
  cardHeader: {
    padding: '13px 13px 0px 13px',
  },
  headerContent: {
    paddingLeft: 9,
  },
  avatar: {
    marginRight: 0,
  },
  description: {
    height: '153px',
    overflow: 'auto',
  },
  expand: {
    transform: 'rotate(0deg)',
  },
  expandAction: {
    padding: 0,
  },
  expanded: {
    maxHeight: 574,
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}))

export default function Book({ book, handleSave }) {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)
  // let hidden = true

  // genres.forEach(genre => {
  //   if (book.categories.includes(genre.category) && genre.checked) {
  //     hidden = false
  //   }
  // })
  // console.log(hidden)
  const differences = get(book, 'differences', [])
  function handleExpandClick() {
    setExpanded(!expanded)
  }

  function BookAction() {
    if (differences.length) {
      return (
        <>
          <Icon
            aria-label="Differences"
            data-tip
            data-for={`differencesIcon-${book.isbn}`}
          />
          <ReactTooltip
            id={`differencesIcon-${book.isbn}`}
            type="info"
            effect="solid"
          >
            {differences.map(difference => (
              <span key={difference.key}>
                {difference.key} {difference.currentValue} ->{' '}
                {difference.newValue}
                <br />
              </span>
            ))}
          </ReactTooltip>
        </>
      )
    }
    return (
      <IconButton
        aria-label={book.owned ? 'owned' : 'unowned'}
        data-testid="ownedIcon"
        onClick={() =>
          handleSave(book, [{ key: 'owned', newValue: !book.owned }])
        }
      >
        {book.owned ? <OwnedBook /> : <UnownedBook />}
      </IconButton>
    )
  }
  return (
    <Card
      className={[
        classes.card,
        expanded ? classes.expanded : null,
        differences.length ? classes.different : null,
      ].join(' ')}
    >
      <div
        className={[
          classes.header,
          book.read ? classes.headerRead : classes.headerUnread,
        ].join(' ')}
        onClick={() =>
          handleSave(book, [{ key: 'read', newValue: !book.read }])
        }
        data-testid="header"
      >
        <CardHeader
          avatar={
            <Typography variant="body2">
              {(Math.round(book.adjustedRating * 1000) / 1000).toString()}
            </Typography>
          }
          action={<BookAction />}
          disableTypography
          title={
            <Typography variant="body2" align="center">
              {book.title}
            </Typography>
          }
          classes={{
            action: classes.iconButton,
            root: classes.cardHeader,
            avatar: classes.avatar,
            content: classes.headerContent,
          }}
        />
        <Typography variant="caption" align="center">
          {book.categories.join(', ')}
        </Typography>
      </div>

      <CardMedia
        classes={{ media: classes.media }}
        component="img"
        image={book.thumbnail || ' '}
        title={book.title}
      />

      <CardContent>
        <Typography
          variant="caption"
          color="textSecondary"
          component="p"
          className={classes.description}
        >
          {book.description}
        </Typography>
      </CardContent>
      <CardActions classes={{ root: classes.expandAction }}>
        <IconButton
          data-testid="expandButton"
          onClick={handleExpandClick}
          className={expanded ? classes.expandOpen : classes.expand}
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="caption" component="div">
            Amazon Rating: {book.amazonAverageRating}
          </Typography>
          <Typography variant="caption" component="div">
            Goodreads Rating: {book.goodreadsAverageRating}
          </Typography>
          <Typography variant="caption" component="div">
            Amazon Review: {book.amazonRatingsCount}
          </Typography>
          <Typography variant="caption" component="div">
            Goodreads Review: {book.goodreadsRatingsCount}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

Book.propTypes = {
  book: PropTypes.shape({
    adjustedRating: PropTypes.number,
    owned: PropTypes.bool,
    title: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    thumbnail: PropTypes.string,
    description: PropTypes.string,
    amazonAverageRating: PropTypes.number,
    amazonRatingsCount: PropTypes.number,
    goodreadsAverageRating: PropTypes.number,
    goodreadsRatingsCount: PropTypes.number,
  }).isRequired,
}
