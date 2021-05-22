import React, { useEffect, useState } from 'react';
import ChattingContent from '../components/ChattingContent';

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

function ChattingContainer() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    //받아오기, 몇번?
    setUserList(temp);
  }, []);

  const onClickFinish = () => {
    console.log('finish');
  };

  return <ChattingContent onClickFinish={onClickFinish} userList={userList} />;
}
export default ChattingContainer;
