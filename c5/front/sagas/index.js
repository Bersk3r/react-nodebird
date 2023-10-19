// import { all, fork, call, put, take, delay, debounce, throttle, takeLatest, takeEvery, TakeLeading, TakeMaybe } from 'redux-saga/effects';
import { all, fork } from 'redux-saga/effects';

import postSaga from "./post";
import userSaga from "./user";
export default function* rootSaga() {
    yield all([
        fork(postSaga),
        fork(userSaga),
    ]);
}