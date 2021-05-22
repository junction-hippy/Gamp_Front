import {
  Divider,
  Grid,
  CircularProgress,
  makeStyles,
  FormControl,
  InputLabel,
  Input,
} from '@material-ui/core';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import palette from '../lib/styles/palette';

const useStyles = makeStyles((theme) => ({
  loading: {
    position: 'relative',
    top: '54px',
    textAlign: 'center',
    '& svg': {
      color: palette.red,
    },
    '& div.loadingText': {
      position: 'relative',
      top: '20px',
      fontSize: '20px',
      height: '23px',
      lineHeight: '23px',
      color: palette.red,
    },
  },
  header: {
    height: '60px',
  },
  divider: {
    borderColor: palette.white,
  },
  searchForm: {
    position: 'relative',
    top: '50px',
    width: '100%',
    height: '43px',
  },
  searchLabel: {
    color: `${palette.main_gray}`,
    fontSize: '14px',
    '&.Mui-focused': {
      color: 'rgba(255, 255, 255, 0.8)',
    },
    left: '-10px',
  },
  searchInput: {
    '&:before': {
      borderBottom: '1px solid rgba(255, 255, 255, 0.8)',
    },

    '&:after': {
      borderBottom: '1px solid rgba(255, 255, 255, 0.8)',
    },
  },
}));

const Container = styled.div`
  margin: 60px;
`;
const StyledSubject = styled.div`
  display: inline-block;
  line-height: 60px;
  margin-left: 20px;
  color: ${palette.white};
  font-size: 24px;
`;
const StyledImg = styled.img`
  width: 60px;
  height: 60px;
  float: left;
`;
const StyledDiv = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin: 15px;
  color: ${palette.white};
  text-align: center;
  line-height: 30px;
  font-size: 20px;
  background-color: ${palette.main_gray};
  border-color: white;
  border-radius: 15px;
`;
const SearchButton = styled.div`
  float: right;
  position: relative;
  top: 70px;
  width: 122px;
  height: 32px;
  text-align: center;
  color: ${palette.white};
  background: ${palette.red};
  line-height: 32px;
  border-radius: 20px;
  cursor: pointer;
`;

function ModalContent({
  setOpen,
  selectedGame,
  isLoading,
  cancelMatching,
  onSearchNickname,
}) {
  const classes = useStyles();
  const [searchWord, setSearchWord] = useState();
  const onChangeSearch = (e) => {
    setSearchWord(e.target.value);
  };

  return (
    <Container>
      <Grid container className={classes.header}>
        <Grid item xs={11}>
          <StyledImg
            src={selectedGame.url}
            alt="selected Game image"
            height="auto"
          />
          <StyledSubject>{selectedGame.name}</StyledSubject>
        </Grid>
        <Grid item xs={1}>
          <StyledDiv onClick={cancelMatching}>X</StyledDiv>
        </Grid>
      </Grid>
      <section>
        {isLoading ? (
          <div className={classes.loading}>
            <CircularProgress />
            <br />
            <div className="loadingText">Waiting for a new gamp...</div>
          </div>
        ) : (
          <>
            <form onSubmit={onSearchNickname}>
              <FormControl className={classes.searchForm}>
                <InputLabel
                  htmlFor="search-game"
                  className={classes.searchLabel}
                >
                  What is your nickname?
                </InputLabel>
                <Input
                  id="search-game"
                  value={searchWord}
                  onChange={onChangeSearch}
                  className={classes.searchInput}
                  style={{ color: 'white' }}
                />
              </FormControl>{' '}
            </form>
            <SearchButton onClick={(e) => onSearchNickname(e, searchWord)}>
              Let's Gamp!
            </SearchButton>
          </>
        )}
      </section>
    </Container>
  );
}
export default ModalContent;
