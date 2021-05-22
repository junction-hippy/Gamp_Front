import { makeStyles, Pagination } from '@material-ui/core';
import React from 'react';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: '20px 0px',
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
  align: {
    maxWidth: `${38 * 9}px`,
    margin: '0px auto',
  },
}));

function SelectGamePagination({ pageNum, onChangePage }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div
        className={classes.align}
        style={{ width: `${38 * (pageNum + 2)}px` }}
      >
        <Pagination count={pageNum} shape="rounded" onChange={onChangePage} />
      </div>
    </div>
  );
}
export default SelectGamePagination;
