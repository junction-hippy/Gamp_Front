import React from 'react';
import styled from '@emotion/styled';
import palette from '../lib/styles/palette';

const Container = styled.div`
  background-color: ${palette.bg[1]};
  color: white;
  height: 100vh;
`;
function ChattingContent() {
  return (
    <Container>
      <div className="App-body">채팅</div>
    </Container>
  );
}
export default ChattingContent;
