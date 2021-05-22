import React from 'react';
import { makeStyles, Modal } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modelPaper: {
    backgroundColor: 'white',
    width: '500px',
    height: '300px',
    boxShadow: theme.shadows[2],
    padding: theme.spacing(2, 4, 3),
    zIndex: '2000',
  },
}));

function CustomModal({ children, open, setOpen }) {
  const classes = useStyles();
  return (
    <Modal className={classes.modal} open={open} onClose={() => setOpen(false)}>
      <div className={classes.modelPaper}>{children}</div>
    </Modal>
  );
}
export default CustomModal;
