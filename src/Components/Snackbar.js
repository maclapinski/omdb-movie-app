import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SnackBar({alertState, close, message, type}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar open={alertState} autoHideDuration={6000} onClose={close}>
        <Alert onClose={close} severity={type}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
