export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            nickname: 'Wook'
        },
        content: '첫 번째 게시글 #해시태그 #익스프레스',
        Images: [{
            src: 'https://cdn.inflearn.com/public/course-325637-cover/d5fd6216-71d1-490e-8759-594cbbdc1973'
        },{
            src: 'https://cdn.inflearn.com/public/files/courses/328630/bfd05949-c148-48ab-80f7-adb9e3286d68/react.jpg'
        },{
            src: 'https://cdn.inflearn.com/public/course-325201-cover/98435f55-996d-4fc0-9337-a7d07edacd03'
        }],
        Comments: [{
            User: {
                nickname: 'nero'
            },
            content: '우와 새로운 강의군요~'
        },{
            User: {
                nickname: 'zero'
            },
            content: '우와 제로초가 나오는군요~'
        }],
    }],
    imagePaths: [],
    postAdded: false,
}

const ADD_POST = 'ADD_POST';
export const addPost = {
    type: ADD_POST,
}

const dummyPost = {
    id: 2,
    content: '더미 데이터입니다.',
    User: {
        id: 1,
        nickname: '제로초',
    },
    Images: [],
    Comments: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true,
            }
        default:
            return state;
    }
};

export default reducer;