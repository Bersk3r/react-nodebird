import { delay, put, all, fork, takeLatest, call } from 'redux-saga/effects';
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
    FOLLOW_SUCCESS,
    LOAD_MY_INFO_REQUEST,
    LOAD_MY_INFO_SUCCESS,
    LOAD_MY_INFO_FAILURE,
    CHANGE_NICKNAME_REQUEST,
    CHANGE_NICKNAME_SUCCESS,
    CHANGE_NICKNAME_FAILURE,
    LOAD_FOLLOWERS_REQUEST,
    LOAD_FOLLOWINGS_REQUEST,
    LOAD_FOLLOWERS_SUCCESS,
    LOAD_FOLLOWERS_FAILURE,
    LOAD_FOLLOWINGS_FAILURE,
    LOAD_FOLLOWINGS_SUCCESS,
    REMOVE_FOLLOWER_REQUEST,
    REMOVE_FOLLOWER_SUCCESS,
    REMOVE_FOLLOWER_FAILURE
} from "../reducers/user";

function removeFollowerAPI(data) {
    return axios.delete(`/user/follower/${data}`);
}

// const l = follow({ type: 'LOG_IN_REQUEST', data: { id: 'zerocho@gmail.com'}});
// l.next();
function* removeFollower(action) {
    try {
        const result = yield call(removeFollowerAPI, action.data);
        // yield delay(1000);
        yield put({
            type: REMOVE_FOLLOWER_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: REMOVE_FOLLOWER_FAILURE,
            error: err.response.data,
        });
    }
}
function loadMyInfoAPI() {
    // return axios.get('/user', {
    //     withCredentials: true
    // });
    return axios.get('/user');
}

// const l = logIn({ type: 'LOG_IN_REQUEST', data: { id: 'zerocho@gmail.com'}});
// l.next();
function* loadMyInfo(action) {
    try {
        const result = yield call(loadMyInfoAPI, action.data);
        // console.log(result);
        // yield delay(1000);
        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            // data: result.data
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: LOAD_MY_INFO_FAILURE,
            error: err.response.data,
        });
    }
}
function loadFollowingsAPI(data) {
    // return axios.get('/user', {
    //     withCredentials: true
    // });
    return axios.get('/user/followings', data);
}

// const l = logIn({ type: 'LOG_IN_REQUEST', data: { id: 'zerocho@gmail.com'}});
// l.next();
function* loadFollowings(action) {
    try {
        const result = yield call(loadFollowingsAPI, action.data);
        // console.log(result);
        // yield delay(1000);
        yield put({
            type: LOAD_FOLLOWINGS_SUCCESS,
            // data: result.data
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: LOAD_FOLLOWINGS_FAILURE,
            error: err.response.data,
        });
    }
}
function loadFollowersAPI(data) {
    // return axios.get('/user', {
    //     withCredentials: true
    // });
    return axios.get('/user/followers', data);
}

// const l = logIn({ type: 'LOG_IN_REQUEST', data: { id: 'zerocho@gmail.com'}});
// l.next();
function* loadFollowers(action) {
    try {
        const result = yield call(loadFollowersAPI, action.data);
        // console.log(result);
        // yield delay(1000);
        yield put({
            type: LOAD_FOLLOWERS_SUCCESS,
            // data: result.data
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: LOAD_FOLLOWERS_FAILURE,
            error: err.response.data,
        });
    }
}
function logInAPI(data) {
    return axios.post('/user/login', data);
}

// const l = logIn({ type: 'LOG_IN_REQUEST', data: { id: 'zerocho@gmail.com'}});
// l.next();
function* logIn(action) {
    try {
        const result = yield call(logInAPI, action.data);
        // console.log(result);
        // yield delay(1000);
        yield put({
            type: LOG_IN_SUCCESS,
            // data: result.data
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data,
        });
    }
}
function followAPI(data) {
    return axios.patch(`/user/${data}/follow`);
}

// const l = follow({ type: 'LOG_IN_REQUEST', data: { id: 'zerocho@gmail.com'}});
// l.next();
function* follow(action) {
    try {
        const result = yield call(followAPI, action.data);
        yield delay(1000);
        yield put({
            type: FOLLOW_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: FOLLOW_FAILURE,
            error: err.response.data,
        });
    }
}
function unfollowAPI(data) {
    return axios.delete(`/user/${data}/follow`);
}

// const l = follow({ type: 'LOG_IN_REQUEST', data: { id: 'zerocho@gmail.com'}});
// l.next();
function* unfollow(action) {
    try {
        const result = yield call(unfollowAPI, action.data);
        // yield delay(1000);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: UNFOLLOW_FAILURE,
            error: err.response.data,
        });
    }
}

function logOutAPI() {
    return axios.post('/user/logout');
}

function* logOut() {
    try {
        yield call(logOutAPI);
        // yield delay(1000);
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

function signUpAPI(data) {
    return axios.post('/user', data);
}
function* signUp(action) {
    try {
        const result = yield call(signUpAPI, action.data);
        console.log(result);
        // yield delay(1000);
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

function changeNicknameAPI(data) {
    return axios.patch('/user/nickname', { nickname: data });
}
function* changeNickname(action) {
    try {
        const result = yield call(changeNicknameAPI, action.data);
        console.log(result);
        // yield delay(1000);
        yield put({
            type: CHANGE_NICKNAME_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        yield put({
            type: CHANGE_NICKNAME_FAILURE,
            error: err.response.data,
        });
    }
}


function* watchRemoveFollower() {
    // yield take('LOG_IN', logIn);
    yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function* watchLoadMyInfo() {
    // yield take('LOG_IN', logIn);
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}
function* watchLoadFollowings() {
    // yield take('LOG_IN', logIn);
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function* watchLoadFollowers() {
    // yield take('LOG_IN', logIn);
    yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
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

function* watchChangeNickname() {
    yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}
export default function* userSaga() {
    yield all([
        fork(watchRemoveFollower),
        fork(watchLoadMyInfo),
        fork(watchLoadFollowings),
        fork(watchLoadFollowers),
        fork(watchLogIn),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchChangeNickname),
    ]);
}