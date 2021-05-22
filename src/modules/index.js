import { combineReducers } from 'redux';
import loading from './loading';
import { all } from 'redux-saga/effects';
import group, { groupSaga } from './group';

const rootReducer = combineReducers({ loading, group });

export function* rootSaga() {
  yield all([groupSaga()]);
}

export default rootReducer;
