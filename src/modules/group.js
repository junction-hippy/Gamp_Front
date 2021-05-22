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

export const setNickname = createAction(SET_NICKNAME, (nickname) => nickname);
export const getGame = createAction(GET_GAME, ({ nickname }) => ({ nickname }));
export const patchUser = createAction(PATCH_USER, ({ nickname, chimeId }) => ({
  nickname,
  chimeId,
}));

const getGameSaga = createRequestSaga(GET_GAME, gameApi.checkGame);
function* patchUserSaga(action) {
  yield put(startLoading(PATCH_USER)); // 로딩 시작
  const { nickname, chimeId } = action.payload;
  try {
    yield call(gameApi.patchUser, action.payload);
    const response = yield call(gameApi.checkGame, action.payload);
    console.log(response);
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
      nickname: nickname,
    }),
  },
  initailState,
);
