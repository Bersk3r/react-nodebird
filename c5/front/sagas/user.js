import { delay, put, all, fork, takeLatest } from 'redux-saga/effects';
import axios from "axios";
import {
    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_OUT_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
    SIGN_UP_FAILURE,
    UNFOLLOW_REQUEST,
    FOLLOW_REQUEST,
    UNFOLLOW_SUCCESS,
    UNFOLLOW_FAILURE,
    FOLLOW_FAILURE,
    FOLLOW_SUCCESS
} from "../reducers/user";
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
            type: LOG_IN_SUCCESS,
            // data: result.data
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data,
        });
    }
}
function followAPI(data) {
    return axios.post('/api/login',data);
}

// const l = follow({ type: 'LOG_IN_REQUEST', data: { id: 'zerocho@gmail.com'}});
// l.next();
function* follow(action) {
    try {
        // const result = yield call(followAPI, action.data);
        yield delay(1000);
        yield put({
            type: FOLLOW_SUCCESS,
            // data: result.data
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data,
        });
    }
}
function unfollowAPI(data) {
    return axios.post('/api/unfollow',data);
}

// const l = follow({ type: 'LOG_IN_REQUEST', data: { id: 'zerocho@gmail.com'}});
// l.next();
function* unfollow(action) {
    try {
        // const result = yield call(unfollowAPI, action.data);
        yield delay(1000);
        yield put({
            type: UNFOLLOW_SUCCESS,
            // data: result.data
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: UNFOLLOW_FAILURE,
            error: err.response.data,
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
            type: LOG_OUT_SUCCESS,
            // data: result.data
        });
    } catch (err) {
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data,
        });
    }
}

function signUpAPI() {
    return axios.post('/api/logout');
}
function* signUp() {
    try {
        // const result = yield call(signUpAPI);
        yield delay(1000);
        yield put({
            type: SIGN_UP_SUCCESS,
            // data: result.data
        });
    } catch (err) {
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        });
    }
}


function* watchLogIn() {
    // yield take('LOG_IN', logIn);
    yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchFollow() {
    // yield take('LOG_IN', logIn);
    yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnfollow() {
    // yield take('LOG_IN', logIn);
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}
export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLogOut),
        fork(watchSignUp),
    ])
}