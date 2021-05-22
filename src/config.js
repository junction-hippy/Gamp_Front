export const BASE_HREF = '';

// API endpoint for retrieving the attendees list, joining the room, and ending the room
export const CHIME_ROOM_API =
  'https://c6gxk541u5.execute-api.ap-northeast-2.amazonaws.com/Prod/';

// Chime-SDK allows up to 16 attendee videos
export const CHIME_ROOM_MAX_ATTENDEE = 5;

// Default video stream to play inside the video player
export const DEFAULT_VIDEO_STREAM =
  'https://fcc3ddae59ed.us-west-2.playback.live-video.net/api/video/v1/us-west-2.893648527354.channel.DmumNckWFTqz.m3u8';

// Default Chat websocket link
export const CHAT_WEBSOCKET =
  'wss://0wsnlk0010.execute-api.ap-northeast-2.amazonaws.com/Prod';

// Chime-SDK logging level: INFO, WARN, ERROR, DEBUG
export const CHIME_LOG_LEVEL = 'WARN';

// Chime-Web UI debugging logging: true / false
export const DEBUG = false;
