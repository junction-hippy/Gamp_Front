import { Divider, Grid, CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';
import styled from '@emotion/styled';

const useStyles = makeStyles((theme) => ({
  loading: {
    position: 'absolute',
    top: '47%',
    left: '47%',
  },
}));

const StyledSubject = styled.div`
  display: inline-block;
  line-height: 79px;
`;
const StyledImg = styled.img`
  width: 100px;
  height: auto;
  float: left;
`;
const StyledDiv = styled.div`
  float: right;
  cursor: pointer;
`;

function ModalContent({
  setOpen,
  selectedGame,
  onSubmitNickname,
  isLoading,
  cancelMatching,
  matched,
}) {
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item xs={10}>
          <StyledImg
            src={selectedGame.url}
            alt="selected Game image"
            height="auto"
          />
          <StyledSubject>이미지</StyledSubject>
        </Grid>
        <Grid item xs={2}>
          <StyledDiv onClick={() => setOpen(false)}>X</StyledDiv>
        </Grid>
      </Grid>
      <Divider />
      <section>
        {isLoading ? (
          <div className={classes.loading}>
            <CircularProgress color="secondary" />
            <br />
            <button onClick={cancelMatching}>Cancel</button>
          </div>
        ) : (
          <form onSubmit={onSubmitNickname}>
            <input />
            <br />
            <input type="submit" value="submit" />
          </form>
        )}

        <button onClick={matched}>임시버튼</button>
      </section>
    </div>
  );
}
export default ModalContent;
