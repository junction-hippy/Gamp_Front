import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import * as config from '../config';
import RemoteVideoGroup from './RemoteVideoGroup';

import { MeetingSessionStatusCode } from 'amazon-chime-sdk-js';

function ChatTest({ chime }) {
  const baseHref = config.BASE_HREF;
  //   const [ssName, setSsName] = useState('');
  const audioElementRef = useRef();

  const history = useHistory();
  const location = useLocation();
  const [meetingStatus, setMeetingStatus] = useState('');
  let ssName = '';
  let title = '';
  let role = '';
  let username = '';
  let joinInfo = {};
  const [roster, setRoster] = useState([]);
  const [rosterChanged, setRosterChanged] = useState(false);
  let previousRoster = {};

  const start = async () => {
    try {
      const qs = new URLSearchParams(location.search);
      const room = qs.get('room');
      ssName = `chime[${room}]`;
      if (!room || !sessionStorage.getItem(ssName)) {
        history.push(`${baseHref}/test`);
      }

      const ssData = JSON.parse(sessionStorage.getItem(ssName));
      console.log(ssData);
      username = ssData.username;
      title = ssData.title;
      role = ssData.role;

      if (!ssData.joinInfo) {
        const response = await chime.createRoom(
          role,
          username,
          title,
          ssData.playbackURL,
        );
        console.log(response);
        joinInfo = response;
        console.log(joinInfo);
        const data = {
          ...ssData,
          joinInfo: joinInfo,
        };
        sessionStorage.setItem(ssName, JSON.stringify(data));
      } else {
        // Browser refresh
        joinInfo = ssData.joinInfo;
        await chime.reInitializeMeetingSession(joinInfo, username);
      }

      setMeetingStatus('Success');
      console.log(meetingStatus);

      chime.audioVideo.addObserver({
        audioVideoDidStop: async (sessionStatus) => {
          if (
            sessionStatus.statusCode() ===
            MeetingSessionStatusCode.AudioCallEnded
          ) {
            const whereTo = `${baseHref}/${role === 'host' ? '' : 'end'}`;
            chime.leaveRoom(role === 'host');
            history.push(whereTo);
          }
        },
      });

      await chime.joinRoom(audioElementRef.current);
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
      setMeetingStatus('Failed');
    }
  };

  //chime setting
  useEffect(() => {
    start();
  }, []);

  return (
    <div className="App-body">
      <audio ref={audioElementRef} style={{ display: 'none' }} />
    </div>
  );
}

export default ChatTest;
