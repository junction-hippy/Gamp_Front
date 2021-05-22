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
  PaginationItem,
} from '@material-ui/core';
import palette from '../lib/styles/palette';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import { useState } from 'react';
import logoWhite from '../assets/images/logo_white.png';
import gampLogo from '../assets/images/gamp_logo.png';

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
  color: #cccccc;
  font-family: DIN Alternate;
`;
const StyledHeaderContent = styled.div`
  position: relative;
  top: 44px;
  font-size: 32px;
`;
const StyledContainer = styled.div`
  background-color: ${palette.bg[1]};
  height: 780px;
  font-family: Helvetica;
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
const NotFound = styled.div`
  position: relative;
  top: 94px;
  width: 283px;
  height: 32px;
  font-size: 24px;
  line-height: 32px;
  color: ${palette.red};
  margin: 0px auto;
`;
const NotFoundBackButton = styled.div`
  position: relative;
  top: 114px;

  width: 90px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  border-radius: 20px;
  background-color: ${palette.red};

  color: ${palette.white};
  margin: 0px auto;

  &:hover {
    cursor: pointer;
  }
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
    margin: '0px auto',
  },
  grid: {
    height: '180px',
    margin: '10px 0px',
    '&:hover': {
      color: 'white',
      filter: 'drop-shadow(0px 0px 100px #2E1D1A)',
      cursor: 'pointer',
    },
  },
  searchForm: {
    position: 'relative',
    top: '93px',
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
  searchIcon: {
    color: 'white',
  },
  pagination: {
    '& li': {
      width: '30px',
    },
    '& button.Mui-selected': {
      backgroundColor: palette.red,
    },
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
          <StyledImg src={item.url} alt={`gameImage-${idx}`} />
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
  searched,
  onClear,
}) {
  const classes = useStyles();
  const [searchWord, setSearchWord] = useState();

  const onChangeSearch = (e) => {
    setSearchWord(e.target.value);
    if (!e.target.value) {
      onClear();
    }
  };

  return (
    <div>
      <StylyedListHeader>
        <StyledHeaderContent className="App-body">
          <img src={logoWhite} alt="GAMP" width="60px" />
          <br />
          <img src={gampLogo} alt="GAMP" width="76px" /> is a service that game
          players can communicate with voice calls <br />
          when they play a game which doesn’t provide a voice chat service.
        </StyledHeaderContent>
      </StylyedListHeader>

      <StyledContainer>
        <div className="App-body">
          <form onSubmit={onSearchGame}>
            <FormControl className={classes.searchForm}>
              <InputLabel htmlFor="search-game" className={classes.searchLabel}>
                What game are you looking for?
              </InputLabel>
              <Input
                id="search-game"
                value={searchWord}
                onChange={onChangeSearch}
                className={classes.searchInput}
                style={{ color: 'white' }}
                endAdornment={
                  <InputAdornment position="end">
                    {searched ? (
                      <>
                        <IconButton
                          onClick={() => {
                            onClear();
                            setSearchWord('');
                          }}
                          className={classes.searchIcon}
                        >
                          <ClearIcon />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton type="submit" className={classes.searchIcon}>
                        <SearchIcon />
                      </IconButton>
                    )}
                  </InputAdornment>
                }
              />
            </FormControl>{' '}
          </form>
          <StyledItemContainer>
            {' '}
            {gameList.length !== 0 ? (
              <Grid container spacing={1}>
                {gameList
                  .slice((page - 1) * 6, page * 6)
                  .map((item, idx) => getItem(item, idx, selectGame, classes))}
              </Grid>
            ) : (
              <>
                <NotFound>Sorry, No Results Found :(</NotFound>
                <NotFoundBackButton
                  onClick={() => {
                    setSearchWord('');
                    onClear();
                  }}
                >
                  Back
                </NotFoundBackButton>
              </>
            )}
          </StyledItemContainer>
          {gameList.length !== 0 && (
            <div className={classes.root}>
              <div
                className={classes.align}
                style={{ width: `${30 * (pageNum + 4)}px` }}
              >
                <Pagination
                  showFirstButton
                  showLastButton
                  count={pageNum}
                  onChange={onChangePage}
                  className={classes.pagination}
                >
                  <PaginationItem type="first" />
                </Pagination>
              </div>
            </div>
          )}
        </div>
      </StyledContainer>
    </div>
  );
}
export default SelectGame;
