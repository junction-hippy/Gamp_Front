import { combineReducers } from 'redux';
import loading from './loading';
import { all } from 'redux-saga/effects';
import data, { dataSaga } from './data';

const rootReducer = combineReducers({ loading, data });

export function* rootSaga() {
  yield all([dataSaga()]);
}

export default rootReducer;
