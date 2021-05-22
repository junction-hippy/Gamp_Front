import Grid from '@material-ui/core/Grid';
import styled from '@emotion/styled';
import { makeStyles } from '@material-ui/core';

const StyledSubject = styled.div`
  display: inline-block;
  line-height: 79px;
`;
const StyledImg = styled.img`
  width: 100px;
  height: auto;
  float: left;
`;

const useStyles = makeStyles((theme) => ({
  grid: {
    '&:hover': {
      color: 'white',
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
      <StyledImg src={item.url} alt={`gameImage-${idx}`} height="auto" />
      <StyledSubject>이미지</StyledSubject>
    </Grid>
  );
};

function SelectGame({ gameList, selectGame, page }) {
  const classes = useStyles();
  console.log(gameList);

  return (
    <div>
      <h4>슬로건/서비스소개 문구/ 배너이미지</h4>
      <form>
        <input name="search" />
        <button>검색</button>
      </form>{' '}
      <br />
      <Grid container>
        {gameList
          .slice((page - 1) * 12, page * 12)
          .map((item, idx) => getItem(item, idx, selectGame, classes))}
      </Grid>
    </div>
  );
}
export default SelectGame;
