import React from 'react';

import styled from '@emotion/styled';
import palette from '../lib/styles/palette';
const Container = styled.div`
  background-color: ${palette.bg[2]};
  color: white;
  height: 50px;
`;
function Header() {
  return (
    <Container>
      {' '}
      <div className="App-body">헤더내용</div>
    </Container>
  );
}
export default Header;
