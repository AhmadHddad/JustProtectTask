import * as actionTypes from './actionTypes.js';

let initialState = {
    isLoading: false,
    isAuth: false,
    err: null,
    posts:null,
    userPosts: null,
    token: null,
    userId:null,
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                isAuth: true,
                token: action.token,
                userId:action.userId,
                err: null,
                isLoading: false
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                isAuth: false,
                isLoading: false,
                err: action.err
            };

        case actionTypes.WAIT_START:
            return {
                ...state,
                isLoading: true
            };

        case actionTypes.WAIT_STOP:
            return {
                ...state,
                isLoading: false,
            };

        case actionTypes.GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.posts,
                err: null,
                isLoading: false
            };

        case actionTypes.GET_ONE_POST_SUCCESS:
            return {
                ...state,
                userPosts: action.post,
                err: null,
                isLoading: false
            };
        case actionTypes.GET_POSTS_FAIL:
            return {
                ...state,
                posts: action.err,
                isLoading: false,
                err:"Cant Get Posts"

            };

        case actionTypes.GET_ONE_POST_FAIL:
            return {
                ...state,
                userPosts: action.err,
                isLoading: false,
                err:action.err
            };
        default:
            return {
                ...state
            }
    }

};

export default reducer;