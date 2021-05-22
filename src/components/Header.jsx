import React from 'react';
import styled from '@emotion/styled';
import palette from '../lib/styles/palette';

const Container = styled.div`
  background-color: ${palette.bg[2]};
  color: white;
  height: 60px;
`;

const Content = styled.div`
  line-height: 60px;
  color: ${palette.main_point[6]};
`;
function Header() {
  return (
    <Container>
      {' '}
      <Content className="App-body">LOGO</Content>
    </Container>
  );
}
export default Header;
