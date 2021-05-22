import React from 'react';
import styled from '@emotion/styled';
import palette from '../lib/styles/palette';

const Container = styled.div`
  background-color: ${palette.bg[2]};
  color: white;
  height: 300px;
`;

function ChattingBottom() {
  return (
    <Container>
      <div className="App-body">아래 버튼</div>
    </Container>
  );
}
export default ChattingBottom;
