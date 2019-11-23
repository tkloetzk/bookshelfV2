import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import CloseIcon from '@material-ui/icons/Close'
import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'
import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import WarningIcon from '@material-ui/icons/Warning'
import LOADING_STATUSES from '../../util/constants'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

const variantIcon = {
  [LOADING_STATUSES.success]: CheckCircleIcon,
  [LOADING_STATUSES.warning]: WarningIcon,
  [LOADING_STATUSES.errored]: ErrorIcon,
  [LOADING_STATUSES.info]: InfoIcon,
}

const useStyles = makeStyles(() => ({
  [LOADING_STATUSES.success]: {
    backgroundColor: green[600],
  },
  [[LOADING_STATUSES.errored]]: {
    backgroundColor: 'red',
  },
  [LOADING_STATUSES.info]: {
    backgroundColor: 'blue',
  },
  [LOADING_STATUSES.warning]: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
    marginRight: 5,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}))

export default function Notification({
  open = false,
  handleClose,
  autoHideDuration,
  message,
  type,
}) {
  const classes = useStyles()

  if (!message || !type) return null

  const Icon = variantIcon[type]

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <SnackbarContent
        className={classes[type]}
        message={
          <span className={classes.message}>
            <Icon className={classes.icon} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  )
}
