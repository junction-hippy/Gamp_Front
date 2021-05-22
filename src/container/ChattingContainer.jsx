import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChattingContent from '../components/ChattingContent';
import { getGame, patchUser } from '../modules/group';
import { useInterval } from 'react-use';

function ChattingContainer({ chimeId }) {
  const { nickname, game } = useSelector((state) => state.group);
  const dispatch = useDispatch();

  useEffect(() => {
    //받아오기, 몇번?
    dispatch(patchUser({ nickname, chimeId }));
  }, [dispatch]);

  useInterval(() => {
    dispatch(getGame({ nickname }));
  }, 5000);

  const onClickFinish = () => {
    console.log('finish');
  };

  return (
    <ChattingContent
      onClickFinish={onClickFinish}
      userList={
        game.groupNotNull.length !== 0
          ? game.groupNotNull
          : [{ img: game.img, nickname }]
      }
    />
  );
}
export default ChattingContainer;
