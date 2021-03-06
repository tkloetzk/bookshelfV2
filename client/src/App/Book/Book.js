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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import get from 'lodash/get'
import Icon from '@material-ui/icons/AnnouncementOutlined'
import ReactTooltip from 'react-tooltip'
import Grid from '@material-ui/core/Grid'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'
import BookEdit from './BookEdit'

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
  resize: {
    fontSize: '12px',
  },
}))

export default function Book({ book, handleSave, handleDelete }) {
  const classes = useStyles()
  const [expanded, setExpanded] = React.useState(false)
  const [editMode, setEditMode] = React.useState(false)

  const unread = get(book, 'unread', true)
  const differences = get(book, 'differences', [])

  function handleExpandClick() {
    setExpanded(!expanded)
  }

  function handleEditMode() {
    setEditMode(!editMode)
  }

  function handleOwnedButton(e) {
    e.stopPropagation()
    const newBook = { ...book, owned: !book.owned }
    handleSave(newBook, [{ key: 'owned', newValue: !book.owned }])
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
        onClick={handleOwnedButton}
      >
        {book.owned ? <OwnedBook /> : <UnownedBook />}
      </IconButton>
    )
  }
  return !editMode ? (
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
          unread ? classes.headerUnread : classes.headerRead,
        ].join(' ')}
        onClick={() => handleSave(book, [{ key: 'unread', newValue: !unread }])}
        data-testid="header"
      >
        <CardHeader
          avatar={
            <Typography variant="body2">
              {(Math.round(book.adjustedRating * 1000) / 1000).toString() || ''}
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
          {(book.categories || []).join(', ')}
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
      <Grid container>
        <Grid item xs={4}>
          <IconButton data-testid="editButton" onClick={handleEditMode}>
            <EditIcon />
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <IconButton
            data-testid="expandButton"
            onClick={handleExpandClick}
            className={expanded ? classes.expandOpen : classes.expand}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <IconButton
            data-testid="deleteButton"
            onClick={() => handleDelete(book)}
          >
            <DeleteForeverIcon />
          </IconButton>
        </Grid>
      </Grid>
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
  ) : (
    <BookEdit book={book} handleSave={handleSave} setEditMode={setEditMode} />
  )
}

Book.propTypes = {
  book: PropTypes.shape({
    adjustedRating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    owned: PropTypes.bool,
    title: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    thumbnail: PropTypes.string,
    description: PropTypes.string,
    amazonAverageRating: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    amazonRatingsCount: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    goodreadsAverageRating: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    goodreadsRatingsCount: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }).isRequired,
}
