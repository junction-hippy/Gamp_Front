import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChattingContent from '../components/ChattingContent';
import { patchUser } from '../modules/group';

const temp = [
  {
    url: 'http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/Aatrox.png',
    name: '이것은 롤입니다.',
  },
  {
    url: 'http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/Gragas.png',
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

function ChattingContainer({ chimeId }) {
  const [userList, setUserList] = useState([]);
  const { nickname, game } = useSelector((state) => state.group);
  const dispatch = useDispatch();

  useEffect(() => {}, [game]);
  useEffect(() => {
    //받아오기, 몇번?
    dispatch(patchUser({ nickname, chimeId }));
    setUserList(temp);
  }, []);

  const onClickFinish = () => {
    console.log('finish');
  };

  return (
    <ChattingContent
      onClickFinish={onClickFinish}
      userList={game.groupNotNull}
    />
  );
}
export default ChattingContainer;
