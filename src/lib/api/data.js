import axios from 'axios';

export const login = async ({ email, password }) => {
  const response = await axios({
    method: 'post',
    url: '/auth/signin',
    data: {
      email: email,
      password: password,
    },
  });
  return response;
};

export const getData = async () => {
  const response = await axios({
    method: 'get',
    url: '/data',
  });
  return response;
};
