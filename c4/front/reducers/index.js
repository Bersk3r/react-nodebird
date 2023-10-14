import { HYDRATE } from "next-redux-wrapper";

import user from './user';
import post from './post';
import { combineReducers } from "redux";

// const initialState = {
//     name: 'zerocho',
//     age: 27,
//     password: 'babo',
// };

// async action creator

// action creator
// const changeNickname = (data) => {
//     return {
//         type: 'CHANGE_NICKNAME',
//         data,
//     }
// }
// changeNickname('boogicho');

// 리듀서는 (이전상태, 액션) => 다음 상태를 만드는 것
const rootReducer = combineReducers( {
    index: (state = {}, action) => {
        switch (action.type) {
            case 'HYDRATE':
                console.log('HYDRATE', action);
                return {
                    ...state,
                    ...action.payload,
                };

            default:
                return state;
        }
    },
    user,
    post,
});

export default rootReducer;