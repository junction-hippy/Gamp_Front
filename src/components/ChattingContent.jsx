import React, { useState } from 'react';
import styled from '@emotion/styled';
import palette from '../lib/styles/palette';
import PeopleIcon from '@material-ui/icons/People';
import { Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import circleDot from '../assets/images/circle_dot.png';
import { Player } from '@lottiefiles/react-lottie-player';
import fireVideo from '../assets/fireVideo.json';

const Container = styled.div`
  background-color: #171b1f;
  color: white;
  height: 1020px;
  font-family: Helvetica;
`;
const Gradient = styled.div`
  color: white;
  height: 1020px;
  background: radial-gradient(
    26.48% 50% at 50% 50%,
    rgba(102, 29, 10, 0.3) 0%,
    rgba(19, 22, 25, 0.3) 100%
  );
`;
const StyledHeader = styled.div`
  height: 171px;
`;
const StyledHeaderContent = styled.div`
  position: relative;
  top: 40px;
  display: flex;
  align-items: center;
`;
const FinishButton = styled.div`
  position: absolute;
  background-color: ${palette.red};
  right: 0px;
  border-radius: 20px;
  width: 90px;
  height: 32px;
  text-align: center;
  font-size: 16px;
  line-height: 32px;
  &:hover {
    cursor: pointer;
  }
`;
const UserContainer = styled.div`
  position: relative;
  width: 664px;
  margin: 0px auto;
  font-family: NotoSansKR;
`;
const Card = styled.div`
  position: absolute;
  display: inline-block;
  width: 180px;
  height: 210px;
  z-index: 10;
  ${({ position }) => position}
`;
const CardImage = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 100px;
`;
const NickName = styled.div`
  text-align: center;
  margin-top: 10px;
  height: 20px;
`;
const CircleDot = styled.img`
  position: absolute;
  left: 90px;
  top: 80px;
  width: 484px;
  height: 484px;
  z-index: 5;
`;
const UserCounter = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  width: 70px;
  height: 32px;
  background-color: ${palette.bg[2]};
  border-radius: 20px;

  div {
    display: flex;
    align-items: center;
    margin: 0px auto;
  }
  div > div {
    display: inline-block;
    margin-left: 5px;
    margin-top: 0px;
    line-height: 24px;
  }
`;
const Mute = styled.div`
  position: relative;
  top: 675px;
  float: right;
  width: 60px;
  height: 60px;
  border: 1px solid #f2f2f2;
  border-radius: 30px;
  cursor: pointer;
  & > div.icon {
    text-align: center;
    height: 60px;
  }
  & svg {
    width: 32px;
    height: 32px;
    margin-top: 14px;
  }

  ${({ isMuted }) =>
    isMuted && `border-color:${palette.red}; & svg{color:${palette.red}}`}
`;

const useStyles = makeStyles(() => ({
  soundContainer: {
    position: 'absolute',
    top: '734px',
    left: '0px',
    width: '53px',
    height: '196px',
    background: palette.bg[2],
    borderRadius: '50px',
    textAlign: 'center',
    '& > div.slider ': {
      position: 'absolute',
      height: '110px',
      top: '24px',
      left: '13px',
    },
    '& .css-zebxpg-MuiSlider-root': {
      color: `${palette.red} !important`,
    },
    '& > div.icon': {
      position: 'relative',
      top: '144px',
      left: '10px',
      width: '32px',
      height: '32px',
      color: palette.main_gray,
    },
  },
  sound: {},
}));

/*(cos(360/접속자수*자신의순서),sin(360/접속자수*자신의순서))
 */

const getCard = (item, idx, position) => {
  return (
    <Card position={position}>
      <CardImage src={item.img} alt="error" />
      <NickName>{item.nickname}</NickName>
    </Card>
  );
};

const position = [
  'left: 242px; top: 0px;',
  'left: 484px; top: 185px;',
  'left: 391px; top: 433px;',
  'left: 93px; top: 433px;',
  'left: 0px; top: 185px;',
];
function ChattingContent({ onDisconnect, userList }) {
  const classes = useStyles();
  const [sound, setSound] = useState(50);
  const [isMuted, setMuted] = useState(false);

  function valuetext(value) {
    setSound(value);
  }
  const handleMute = () => {
    setMuted((prev) => !prev);
  };
  return (
    <Container>
      <Gradient>
        <div className="App-body container">
          <StyledHeader>
            <StyledHeaderContent>
              <img
                src="https://logodownload.org/wp-content/uploads/2014/09/lol-league-of-Legends-logo-1-1.png"
                alt="error"
                width="60px"
                height="60px"
              />
              <div
                style={{
                  display: 'inline-block',
                  lineHeight: '60px',
                  marginLeft: '30px',
                }}
              >
                League of Legends
              </div>
              <UserCounter>
                <div>
                  <PeopleIcon style={{ color: 'white' }} />
                  <div>{userList.length}</div>
                </div>
              </UserCounter>

              <FinishButton onClick={onDisconnect}> Finish</FinishButton>
            </StyledHeaderContent>
          </StyledHeader>
          <UserContainer>
            {userList.map((item, idx) => getCard(item, idx, position[idx]))}
            <CircleDot src={circleDot} alt="circle dot" />
            <Player
              src={fireVideo}
              background="transparent"
              speed="1"
              style={{
                position: 'absolute',
                top: '230px',
                left: '257px',
                width: '150px',
                height: '150px',
                color: palette.red,
                opacity: 0.2,
                filter: 'blur(1px)',
              }}
              renderer="svg"
              loop
              controls
              autoplay
            ></Player>
          </UserContainer>
          <div className={classes.soundContainer}>
            <div className="slider">
              <Slider
                orientation="vertical"
                getAriaValueText={valuetext}
                defaultValue={50}
                aria-labelledby="vertical-slider"
                className={classes.sound}
              />
            </div>
            <div className="icon">
              {sound ? <VolumeUpIcon /> : <VolumeOffIcon />}
            </div>
          </div>
          <Mute onClick={handleMute} isMuted={isMuted}>
            <div className="icon">{isMuted ? <MicOffIcon /> : <MicIcon />}</div>
          </Mute>
        </div>
      </Gradient>
    </Container>
  );
}
export default ChattingContent;
