import Grid from '@material-ui/core/Grid';
import styled from '@emotion/styled';
import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  makeStyles,
  Pagination,
} from '@material-ui/core';
import palette from '../lib/styles/palette';
import SearchIcon from '@material-ui/icons/Search';
import { useState } from 'react';

const StyledSubject = styled.div`
  display: inline-block;
  line-height: 79px;
  margin-left: 24px;
`;
const StyledImg = styled.img`
  width: 80px;
  height: 80px;
  float: left;
`;
const StylyedListHeader = styled.div`
  height: 240px;
  background-color: ${palette.bg[2]};
  color: ${palette.main_point[6]};
`;
const StyledHeaderContent = styled.div`
  position: relative;
  top: 104px;
  font-size: 32px;
`;
const StyledContainer = styled.div`
  background-color: ${palette.bg[1]};
  height: 780px;
`;
const StyledItemContainer = styled.div`
  position: relative;
  top: 176px;
`;
const StyledGridContainer = styled.div`
  width: 387px;
  height: 180px;
  display: flex;
  align-items: center;
  background-color: ${palette.bg[3]};
  border-radius: 30px;
`;
const StyledCotent = styled.div`
  position: relative;
  width: 357px;
  height: 80px;
  left: 30px;
  margin: auto 0px;
  color: white;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    top: '254px',
    '& > *': {
      marginTop: theme.spacing(2),
    },
    '& button': {
      color: 'white',
    },
  },
  align: {
    maxWidth: `${38 * 9}px`,
    margin: '0px auto',
  },
  grid: {
    height: '180px',
    margin: '10px 0px',
    '&:hover': {
      color: 'white',
    },
  },
  searchForm: {
    position: 'relative',
    top: '93px',
    width: '100%',
    height: '43px',
  },
  searchLabel: {
    color: 'white !important',
    fontSize: '14px',
  },
  searchInput: {
    '&:before': {
      borderBottom: '1px solid rgba(255, 255, 255, 0.8)',
    },

    '&:after': {
      borderBottom: '1px solid rgba(255, 255, 255, 0.8)',
    },
  },
  searchIcon: {
    color: 'white',
  },
}));

const getItem = (item, idx, selectGame, classes) => {
  return (
    <Grid
      item
      xs={4}
      key={`gameImage-${idx}`}
      onClick={() => selectGame(item)}
      className={classes.grid}
    >
      <StyledGridContainer>
        <StyledCotent>
          <StyledImg src={item.url} alt={`gameImage-${idx}`} height="auto" />
          <StyledSubject>{item.name}</StyledSubject>
        </StyledCotent>
      </StyledGridContainer>
    </Grid>
  );
};

function SelectGame({
  gameList,
  selectGame,
  page,
  pageNum,
  onChangePage,
  onSearchGame,
}) {
  const classes = useStyles();
  const [searchWord, setSearchWord] = useState();
  console.log(gameList);

  return (
    <div>
      <StylyedListHeader>
        <StyledHeaderContent className="App-body">
          It is a service that game players can communicate with voice calls{' '}
          <br />
          when they play a game which doesn’t provide a voice chat service.
        </StyledHeaderContent>
      </StylyedListHeader>

      <StyledContainer>
        <div className="App-body">
          <FormControl onSubmit={onSearchGame} className={classes.searchForm}>
            <InputLabel htmlFor="search-game" className={classes.searchLabel}>
              What game are you looking for?
            </InputLabel>
            <Input
              id="search-game"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              className={classes.searchInput}
              style={{ color: 'white' }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={onSearchGame}
                    className={classes.searchIcon}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>{' '}
          <StyledItemContainer>
            <Grid container spacing={1}>
              {gameList
                .slice((page - 1) * 6, page * 6)
                .map((item, idx) => getItem(item, idx, selectGame, classes))}
            </Grid>
          </StyledItemContainer>
          <div className={classes.root}>
            <div
              className={classes.align}
              style={{ width: `${38 * (pageNum + 4)}px` }}
            >
              <Pagination
                showFirstButton
                showLastButton
                count={pageNum}
                shape="rounded"
                onChange={onChangePage}
              />
            </div>
          </div>
        </div>
      </StyledContainer>
    </div>
  );
}
export default SelectGame;
