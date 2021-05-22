import axios from 'axios';

export const checkGame = async (nickname) => {
  console.log(nickname);
  const response = await axios({
    method: 'post',
    url: 'http://3.37.62.94/checkgame',
    data: {
      nickname,
    },
  });
  return response;
};

export const checkGameOn = async ({ userid, groupid }) => {
  const response = await axios({
    method: 'post',
    url: 'http://3.37.62.94/checkgame/connection',
    data: {
      userid,
      groupid,
    },
  });
  return response;
};

export const patchUser = async ({ nickname, chimeId }) => {
  const response = await axios({
    method: 'patch',
    url: 'http://3.37.62.94/checkgame/chime',
    data: {
      nickname,
      chimeId,
    },
  });
  return response;
};

export const findUser = async ({ chimeId }) => {
  const response = await axios({
    method: 'get',
    url: `http://3.37.62.94/checkgame/${chimeId}`,
  });
  return response;
};
