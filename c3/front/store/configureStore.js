//configureStore.js
import { createWrapper } from 'next-redux-wrapper';
import {applyMiddleware, createStore, compose} from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from '../reducers';
const configureStore = () => {
    const middlewares = [];
    const enhancer = process.env.NODE_DEV === 'production'
        ? compose(applyMiddleware(...middlewares))
        : composeWithDevTools(applyMiddleware(...middlewares));
    const store = createStore(reducer, enhancer);
    // store.dispatch({
    //     type: 'CHANGE_ACTION',
    //     data: 'boogicho',
    // })
    return store;
};

const wrapper = createWrapper(configureStore, {
    debug: process.env.NODE_ENV === 'development',
});

export default wrapper;