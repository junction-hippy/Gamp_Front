import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import CustomModal from '../components/CustomModal';
import ModalContent from '../components/ModalContent';
import SelectGame from '../components/SelectGame';
import { getGame, setNickname } from '../modules/group';
import { getGameList } from '../lib/api/gameList';
import AmongUS from '../assets/images/AmongUs.webp';
import LostArk from '../assets/images/Lost Ark.jpeg';
import Minecraft from '../assets/images/Minecraft.webp';
import StardewValley from '../assets/images/Stardew Valley.webp';
import ValheimGuide from '../assets/images/Valheim guide.webp';

const gameList = [
  {
    url: 'https://logodownload.org/wp-content/uploads/2014/09/lol-league-of-Legends-logo-1-1.png',
    name: '롤',
  },
  {
    url: AmongUS,
    name: 'Among Us',
  },
  {
    url: LostArk,
    name: 'Lost Ark',
  },
  {
    url: Minecraft,
    name: 'Minecraft',
  },
  {
    url: StardewValley,
    name: 'Stardew Valley',
  },
  {
    url: ValheimGuide,
    name: 'Valheim guide',
  },
];

function SelectGameContainer({ chime }) {
  const [selectedGame, setSelectedGame] = useState();
  const [pageNum, setPageNum] = useState(1);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState([]);
  const [errMsg, setErrMsg] = useState(false);
  const history = useHistory();

  const { nickname, game } = useSelector((state) => state.group);
  const dispatch = useDispatch();

  useEffect(() => {
    setPageNum(Math.floor(gameList.length / 12 + 1));
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
    if (word) {
      dispatch(setNickname(word));
    } else if (e.target[0]) {
      dispatch(setNickname(e.target[0].defaultValue));
    }
    if (nickname === '채팅') {
      history.push('/chat');
    } else if (nickname === '에러') {
      setErrMsg(true);
    } else {
      setIsLoading(true);
      console.log(nickname);
    }
  };
  useEffect(() => {
    if (nickname !== '') {
      dispatch(getGame(nickname));
    }
  }, [nickname, dispatch]);

  const onClear = () => {
    setSearched(false);
    setResult([]);
    setErrMsg(false);
  };

  useEffect(() => {
    console.log(game);
    if (game) {
      const data = {
        username: nickname,
        title: game.groupid,
        playbackURL:
          'https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8',
        role: 'host',
      };
      sessionStorage.setItem(`chime[${game.groupid}]`, JSON.stringify(data));
      history.push(`/meeting?room=${game.groupid}`);
    }
  }, [game, history, nickname]);

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
