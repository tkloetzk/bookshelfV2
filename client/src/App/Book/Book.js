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

const useStyles = makeStyles({
  card: {
    width: 235,
    maxHeight: 455,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    margin: '13px',
  },
  media: {
    width: '33%',
  },
  iconButton: {
    alignSelf: 'center',
  },
  cardHeader: {
    padding: '13px',
  },
  avatar: {
    marginRight: 0,
  },
  description: {
    height: '153px',
  },
})

export default function Book({ book = {} }) {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={(
          <Typography variant="body2">
            {Math.round(book.adjustedRating * 1000) / 1000}
          </Typography>
        )}
        action={(
          <IconButton aria-label="owned">
            {book.owned ? <OwnedBook /> : <UnownedBook />}
          </IconButton>
        )}
        disableTypography
        title={(
          <Typography variant="body2" align="center">
            {book.title}
          </Typography>
        )}
        subheader={(
          <Typography variant="caption" align="center">
            {book.categories.join(', ')}
          </Typography>
        )}
        classes={{
          action: classes.iconButton,
          root: classes.cardHeader,
          avatar: classes.avatar,
        }}
      />
      <CardMedia
        className={classes.media}
        component="img"
        image={book.thumbnail}
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
    </Card>
  )
}

Book.defaultProps = {
  book: {},
}

Book.propTypes = {
  book: PropTypes.shapeOf({
    adjustedRating: PropTypes.number,
    owned: PropTypes.bool,
    title: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
    thumbnail: PropTypes.string,
    description: PropTypes.string,
  }),
}
