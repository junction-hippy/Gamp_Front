import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as gameApi from '../lib/api/game';
import { call, delay, put, takeLatest } from 'redux-saga/effects';

const SET_NICKNAME = 'group/SET_NICKNAME';
const [GET_GAME, GET_GAME_SUCCESS, GET_GAME_FAILURE] =
  createRequestActionTypes('group/GET_GAME');
const [PATCH_USER] = createRequestActionTypes('group/PATCH_USER');

export const setNickname = createAction(SET_NICKNAME, (nickname) => nickname);
export const getGame = createAction(GET_GAME, (nickname) => nickname);
export const patchUser = createAction(PATCH_USER, ({ nickname, chimeId }) => ({
  nickname,
  chimeId,
}));

const getGameSaga = createRequestSaga(GET_GAME, gameApi.checkGame);
const patchUserSaga = createRequestSaga(PATCH_USER, gameApi.patchUser);
export function* groupSaga() {
  yield takeLatest(GET_GAME, getGameSaga);
  yield takeLatest(PATCH_USER, patchUserSaga);
}

const initailState = {
  nickname: '',
  game: null,
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
      nickname,
    }),
  },
  initailState,
);
