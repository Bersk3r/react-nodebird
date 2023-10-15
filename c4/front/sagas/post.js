import { delay, put, all, fork, takeLatest, throttle } from 'redux-saga/effects';
import axios from "axios";
import {
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
    REMOVE_POST_REQUEST,
    REMOVE_POST_SUCCESS,
    REMOVE_POST_FAILURE,
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_FAILURE, LOAD_POSTS_SUCCESS,
    generateDummyPost
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";
import shortId from "shortid";

function addPostAPI(data) {
    return axios.post('/api/post', data);
}

function* addPost(action) {
    try {
        // const result = yield call(addPostAPI, action.data);
        yield delay(1000);
        const id = shortId.generate();
        yield put({
            type: ADD_POST_SUCCESS,
            // data: result.data
            data: {
                id,
                content: action.data,
            },
        });
        yield put({
            type: ADD_POST_TO_ME,
            // data: result.data
            data: id,
        });
    } catch (err) {
        yield put({
            type: ADD_POST_FAILURE,
            error: err.response.data,
        });
    }
}
function loadPostsAPI(data) {
    return axios.get('/api/posts', data);
}

function* loadPosts(action) {
    try {
        // const result = yield call(addPostAPI, action.data);
        yield delay(1000);
        yield put({
            type: LOAD_POSTS_SUCCESS,
            // data: result.data
            data: generateDummyPost(10),
        });
    } catch (err) {
        yield put({
            type: LOAD_POSTS_FAILURE,
            error: err.response.data,
        });
    }
}
function removePostAPI(data) {
    return axios.delete('/api/post', data);
}

function* removePost(action) {
    try {
        // const result = yield call(addPostAPI, action.data);
        yield delay(1000);
        yield put({
            type: REMOVE_POST_SUCCESS,
            // data: result.data
            data: action.data,
        });
        yield put({
            type: REMOVE_POST_OF_ME,
            // data: result.data
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: REMOVE_POST_FAILURE,
            error: err.response.data,
        });
    }
}

function addCommentAPI(data) {
    return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addComment(action) {
    try {
        // const result = yield call(addCommentAPI, action.data);
        console.log(action.data);
        yield delay(1000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            // data: result.data
            data: action.data,
        });
    } catch (err) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: err.response.data,
        });
    }
}


function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
    // yield throttle('ADD_POST_REQUEST', addPost, 10000);
}
function* watchLoadPosts() {
    yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
    // yield throttle('ADD_POST_REQUEST', addPost, 10000);
}
function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
    // yield throttle('ADD_POST_REQUEST', addPost, 10000);
}
function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
    // yield throttle('ADD_POST_REQUEST', addPost, 10000);
}

export default function* postSaga() {
    yield all([
        fork(watchAddPost),
        fork(watchLoadPosts),
        fork(watchRemovePost),
        fork(watchAddComment),
    ]);
}