import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import CustomModal from '../components/CustomModal';
import ModalContent from '../components/ModalContent';
import SelectGame from '../components/SelectGame';
import { getGameList } from '../lib/api/gameList';

const temp = [
  {
    url: 'https://logodownload.org/wp-content/uploads/2014/09/lol-league-of-Legends-logo-1-1.png',
    name: '이것은 롤입니다.',
  },
  {
    url: 'https://logodownload.org/wp-content/uploads/2014/09/lol-league-of-Legends-logo-1-1.png',
    name: '이것은 롤입니다.',
  },
  {
    url: 'https://logodownload.org/wp-content/uploads/2014/09/lol-league-of-Legends-logo-1-1.png',
    name: '이것은 롤입니다.',
  },
  {
    url: 'https://logodownload.org/wp-content/uploads/2014/09/lol-league-of-Legends-logo-1-1.png',
    name: '이것은 롤입니다.',
  },
  {
    url: 'https://logodownload.org/wp-content/uploads/2014/09/lol-league-of-Legends-logo-1-1.png',
    name: '이것은 롤입니다.',
  },
];

function SelectGameContainer() {
  const [gameList, setGameList] = useState([]);
  const [selectedGame, setSelectedGame] = useState();
  const [pageNum, setPageNum] = useState(1);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState([]);
  const [errMsg, setErrMsg] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const response = getGameList();

    //setGameList(response.data);
    setGameList(temp);
    setPageNum(Math.floor(temp.length / 12 + 1));
  }, []);

  const selectGame = (selectedGame) => {
    setSelectedGame(selectedGame);
    console.log(selectedGame);
    //적절한 작업 후
    setOpen(true);
  };
  const cancelMatching = () => {
    setOpen(false);
    setIsLoading(false);
  };

  const onSearchGame = (e, word) => {
    //검색 기능
    e.preventDefault();
    setSearched(true);
    setResult(
      gameList.filter((item) => item.name.includes(e.target[0].defaultValue)),
    );
  };
  const onSearchNickname = (e, word) => {
    e.preventDefault();
    setErrMsg(false);
    //검색
    let search;
    if (word) {
      search = word;
    } else if (e.target[0]) {
      search = e.target[0].defaultValue;
    }
    if (search === '채팅') {
      history.push('/chat');
    } else if (search === '에러') {
      setErrMsg(true);
    } else {
      setIsLoading(true);
    }
  };
  const onClear = () => {
    setSearched(false);
    setResult([]);
    setErrMsg(false);
  };

  return (
    <div>
      <SelectGame
        gameList={searched ? result : gameList}
        selectGame={selectGame}
        page={page}
        pageNum={pageNum}
        onChangePage={(e, page) => setPage(page)}
        onSearchGame={onSearchGame}
        searched={searched}
        onClear={onClear}
      />
      <CustomModal open={open} setOpen={setOpen}>
        {' '}
        <ModalContent
          setOpen={setOpen}
          selectedGame={selectedGame}
          isLoading={isLoading}
          cancelMatching={cancelMatching}
          onSearchNickname={onSearchNickname}
          errMsg={errMsg}
        />
      </CustomModal>
    </div>
  );
}

export default SelectGameContainer;