import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as dataApi from '../lib/api/data';
import { takeLatest } from 'redux-saga/effects';

const [GET_DATA, GET_DATA_SUCCESS, GET_DATA_FAILURE] =
  createRequestActionTypes('data/GET_DATA');

export const getData = createAction(GET_DATA, (id) => id);

const getDataSaga = createRequestSaga(GET_DATA, dataApi.getData);
export function* dataSaga() {
  yield takeLatest(GET_DATA, getDataSaga);
}

const initailState = {
  data: null,
  error: null,
};

export default handleActions(
  {
    [GET_DATA_SUCCESS]: (state, { payload: data }) => ({
      ...state,
      data,
    }),
    [GET_DATA_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initailState,
);
