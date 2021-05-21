import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Main from '../components/Main';
import { getData } from '../modules/data';

const MainContainer = (props) => {
  const { data } = useSelector((state) => state.data);
  const { loading, error } = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('123');
    dispatch(getData());
  }, [dispatch]);
  return <Main data={data} loading={loading} error={error} />;
};

export default MainContainer;
