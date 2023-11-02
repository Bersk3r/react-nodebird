//configureStore.js
import { createWrapper } from 'next-redux-wrapper';
import {applyMiddleware, createStore, compose} from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
// import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers';
import rootSaga from '../sagas';

const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
    // if (typeof action === 'function') {
    //     return action(dispatch, getState);
    // }
    console.log(action);
    return next(action);
};


const configureStore = () => {
    // const middlewares = [thunkMiddleware, loggerMiddleware];
    const sagaMiddleware = createSagaMiddleware()
    const middlewares = [sagaMiddleware, loggerMiddleware];
    const enhancer = process.env.NODE_DEV === 'production'
        ? compose(applyMiddleware(...middlewares))
        : composeWithDevTools(applyMiddleware(...middlewares));
    const store = createStore(reducer, enhancer);
    store.sagaTask = sagaMiddleware.run(rootSaga);
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