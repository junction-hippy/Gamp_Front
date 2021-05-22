import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router';
import CustomModal from '../components/CustomModal';
import ModalContent from '../components/ModalContent';
import SelectGame from '../components/SelectGame';
import SelectGamePagination from '../components/SelectGamePagination';
import { getGameList } from '../lib/api/gameList';

const temp = [
  {
    url: 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
    name: '게임이름',
  },
  {
    url: 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
    name: '게임이름',
  },
  {
    url: 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
    name: '게임이름',
  },
  {
    url: 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
    name: '게임이름',
  },
  {
    url: 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
    name: '게임이름',
  },
];

function SelectGameContainer({ chime }) {
  const [gameList, setGameList] = useState([]);
  const [selectedGame, setSelectedGame] = useState();
  const [pageNum, setPageNum] = useState(1);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmitNickname = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  const cancelMatching = () => {
    setOpen(false);
    setIsLoading(false);
  };

  const matched = () => {
    history.push('/chat');
  };

  return (
    <div className="App-body">
      <SelectGame gameList={gameList} selectGame={selectGame} page={page} />
      <SelectGamePagination
        pageNum={pageNum}
        onChangePage={(e, page) => setPage(page)}
      />
      <CustomModal open={open} setOpen={setOpen}>
        {' '}
        <ModalContent
          setOpen={setOpen}
          selectedGame={selectedGame}
          onSubmitNickname={onSubmitNickname}
          isLoading={isLoading}
          cancelMatching={cancelMatching}
          matched={matched}
          chime={chime}
        />
      </CustomModal>
    </div>
  );
}

export default SelectGameContainer;
