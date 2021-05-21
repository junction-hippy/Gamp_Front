import React from 'react';

const Main = ({ data, error, loading }) => {
  if (error) return <h1>에러가 발생했습니다.</h1>;
  return (
    <div>{!loading && data && data.map((item) => <p>{item.title}</p>)}</div>
  );
};

export default Main;
