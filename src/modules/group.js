import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as gameApi from '../lib/api/game';
import { call, delay, put, takeLatest } from 'redux-saga/effects';
import { finishLoading, startLoading } from './loading';

const SET_NICKNAME = 'group/SET_NICKNAME';
const [GET_GAME, GET_GAME_SUCCESS, GET_GAME_FAILURE] =
  createRequestActionTypes('group/GET_GAME');
const [PATCH_USER] = createRequestActionTypes('group/PATCH_USER');
const DELETE_USER = 'group/DELETE_USER';
const INIT_GAME = 'group/INIT_GAME';
const [CONNECTION, CONNECTION_SUCCESS, CONNECTION_FAILURE] =
  createRequestActionTypes('group/CONNECTION');

export const initGame = createAction(INIT_GAME);
export const setNickname = createAction(SET_NICKNAME, (nickname) => nickname);
export const getGame = createAction(GET_GAME, ({ nickname }) => ({ nickname }));
export const patchUser = createAction(PATCH_USER, ({ nickname, chimeId }) => ({
  nickname,
  chimeId,
}));
export const deleteUser = createAction(DELETE_USER, ({ chimeId }) => ({
  chimeId,
}));
export const connection = createAction(CONNECTION, ({ userid, groupid }) => ({
  userid,
  groupid,
}));

function* deleteUserSaga(action) {
  try {
    yield call(gameApi.deleteUser, action.payload);
  } catch (e) {
    console.log(e);
  }
}
const getGameSaga = createRequestSaga(GET_GAME, gameApi.checkGame);
const connectionSaga = createRequestSaga(CONNECTION, gameApi.connection);
function* patchUserSaga(action) {
  yield put(startLoading(PATCH_USER)); // 로딩 시작
  try {
    yield call(gameApi.patchUser, action.payload);
    const response = yield call(gameApi.checkGame, action.payload);
    yield put({
      type: GET_GAME_SUCCESS,
      payload: response.data,
      meta: response,
    });
  } catch (e) {
    yield put({
      type: GET_GAME_FAILURE,
      payload: e,
      error: true,
    });
  }
  yield put(finishLoading(PATCH_USER)); // 로딩 끝
}

export function* groupSaga() {
  yield takeLatest(GET_GAME, getGameSaga);
  yield takeLatest(PATCH_USER, patchUserSaga);
  yield takeLatest(DELETE_USER, deleteUserSaga);
  yield takeLatest(CONNECTION, connectionSaga);
}

const initailState = {
  nickname: '',
  game: null,
  userList: [],
  error: null,
};

export default handleActions(
  {
    [GET_GAME_SUCCESS]: (state, { payload: game }) => ({
      ...state,
      game,
    }),
    [GET_GAME_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [SET_NICKNAME]: (state, { payload: nickname }) => ({
      ...state,
      nickname: nickname,
    }),
    [CONNECTION_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      userList: data.groupNotNull,
    }),
    [CONNECTION_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [INIT_GAME]: () => initailState,
  },
  initailState,
);
