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

  return (
    <ChattingContent
      onDisconnect={onDisconnect}
      userList={
        userList.length !== 0 ? userList : [{ img: game.img, nickname }]
      }
    />
  );
}
export default ChattingContainer;
