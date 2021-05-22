import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import * as config from '../config';
import RemoteVideoGroup from './RemoteVideoGroup';

import { MeetingSessionStatusCode } from 'amazon-chime-sdk-js';

function ChatTest({ chime }) {
  const baseHref = config.BASE_HREF;
  const audioElementRef = useRef();

  const history = useHistory();
  const location = useLocation();
  const meetingStatus = useRef('');
  const ssName = useRef('');
  const title = useRef('');
  const role = useRef('');
  const username = useRef('');
  const joinInfo = useRef({});

  //chime setting
  useEffect(() => {
    const start = async () => {
      try {
        const qs = new URLSearchParams(location.search);
        const room = qs.get('room');
        ssName.current = `chime[${room}]`;
        if (!room || !sessionStorage.getItem(ssName.current)) {
          history.push(`${baseHref}/test`);
        }

        const ssData = JSON.parse(sessionStorage.getItem(ssName.current));
        console.log(ssData);
        username.current = ssData.username;
        title.current = ssData.title;
        role.current = ssData.role;

        if (!ssData.joinInfo) {
          const response = await chime.createRoom(
            role,
            username,
            title,
            ssData.playbackURL,
          );
          console.log(response);
          joinInfo.current = response;
          console.log(joinInfo);
          const data = {
            ...ssData,
            joinInfo: joinInfo,
          };
          sessionStorage.setItem(ssName, JSON.stringify(data));
        } else {
          // Browser refresh
          joinInfo.current = ssData.joinInfo;
          await chime.reInitializeMeetingSession(joinInfo, username);
        }

        meetingStatus.current = 'Success';
        console.log(meetingStatus.current);

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
        meetingStatus.current = 'Failed';
      }
    };
    start();
  }, [baseHref, history, chime, location]);

  return (
    <div className="App-body">
      <audio ref={audioElementRef} style={{ display: 'none' }} />
      {/* {meetingStatus === 'Success' && (
        <RemoteVideoGroup joinInfo={this.joinInfo} />
      )} */}
    </div>
  );
}

export default ChatTest;
