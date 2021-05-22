import React from 'react';
import styled from '@emotion/styled';
import palette from '../lib/styles/palette';

const Container = styled.div`
  background-color: ${palette.bg[0]};
  color: white;
  height: 100px;
`;

function ChattingHeader() {
  return (
    <Container>
      <div className="App-body">내부헤더</div>
    </Container>
  );
}
export default ChattingHeader;
