import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChattingContent from '../components/ChattingContent';
import {
  connection,
  deleteUser,
  getGame,
  initGame,
  patchUser,
} from '../modules/group';
import { useInterval } from 'react-use';
import { useHistory } from 'react-router';

const temp = [
  {
    item: 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
    nickname: '',
  },
  {
    item: 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
    nickname: '',
  },
  {
    item: 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
    nickname: '',
  },
  {
    item: 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
    nickname: '',
  },
  {
    item: 'http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg',
    nickname: '',
  },
];

function ChattingContainer({ chime, chimeId }) {
  const { nickname, game, userList } = useSelector((state) => state.group);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const { userid, groupid } = game;
    dispatch(patchUser({ nickname, chimeId, userid, groupid }));
  }, [dispatch]);

  useInterval(() => {
    const { userid, groupid } = game;
    dispatch(connection({ userid, groupid }));
  }, 5000);

  const onDisconnect = () => {
    dispatch(deleteUser({ chimeId }));
    dispatch(initGame());
    chime.leaveRoom(true);
    localStorage.removeItem(`chime[${game.groupid}]`);
    history.push('/');
  };

  useEffect(() => {
    if (game.isGaming === false) {
      onDisconnect();
    }
    if (game.isGaming === undefined) {
      onDisconnect();
    }
  }, [game]);

  return (
    <div>
      {userList ? (
        <ChattingContent
          onDisconnect={onDisconnect}
          userList={
            userList.length !== 0 ? userList : [{ img: game.img, nickname }]
          }
        />
      ) : (
        <ChattingContent
          onDisconnect={onDisconnect}
          userList={[
            {
              img: 'https://logodownload.org/wp-content/uploads/2014/09/lol-league-of-Legends-logo-1-1.png',
              nickname,
            },
          ]}
        />
      )}
    </div>
  );
}
export default ChattingContainer;
