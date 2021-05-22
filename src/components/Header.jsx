import React from 'react';
import styled from '@emotion/styled';
import palette from '../lib/styles/palette';
import logo from '../assets/images/gamp_logo.png';

const Container = styled.div`
  background-color: ${palette.bg[2]};
  color: white;
  height: 60px;
`;

const Content = styled.div`
  line-height: 60px;
  color: ${palette.red};
`;
function Header() {
  return (
    <Container>
      {' '}
      <Content className="App-body">
        <img src={logo} alt="GAMP" width="70px" />
      </Content>
    </Container>
  );
}
export default Header;
