import React from 'react';
import { makeStyles, Modal } from '@material-ui/core';
import palette from '../lib/styles/palette';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
  modelPaper: {
    backgroundColor: palette.bg[2],
    width: '794px',
    height: '312px',
    boxShadow: theme.shadows[2],
    zIndex: '2000',
    filter: 'drop-shadow(0px 0px 100px rgba(46, 29, 26, 0.7))',
    borderRadius: '30px',
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
