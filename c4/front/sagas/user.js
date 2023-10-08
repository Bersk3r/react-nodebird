import { delay, put, all, fork, takeLatest } from 'redux-saga/effects';
import axios from "axios";
function logInAPI(data) {
    return axios.post('/api/login',data);
}

// const l = logIn({ type: 'LOG_IN_REQUEST', data: { id: 'zerocho@gmail.com'}});
// l.next();
function* logIn(action) {
    try {
        // const result = yield call(logInAPI, action.data);
        yield delay(1000);
        yield put({
            type: 'LOG_IN_SUCCESS',
            // data: result.data
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: 'LOG_IN_FAILURE',
            data: err.response.data,
        });
    }
}

function logOutAPI() {
    return axios.post('/api/logout');
}

function* logOut() {
    try {
        // const result = yield call(logOutAPI);
        yield delay(1000);
        yield put({
            type: 'LOG_OUT_SUCCESS',
            // data: result.data
        });
    } catch (err) {
        yield put({
            type: 'LOG_OUT_FAILURE',
            data: err.response.data,
        });
    }
}
function* watchLogIn() {
    // yield take('LOG_IN', logIn);
    yield takeLatest('LOG_IN_REQUEST', logIn);
}

function* watchLogOut() {
    yield takeLatest('LOG_OUT_REQUEST', logOut);
}
export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
    ])
}