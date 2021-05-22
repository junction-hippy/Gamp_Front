import axios from 'axios';

export const getGameList = async () => {
  const response = await axios.get('/');

  return response;
};
