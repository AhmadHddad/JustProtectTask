import * as actionTypes from './actionTypes.js';
import axios from 'axios';


// wait actionCreators

export const waitStart = () => {
    return {
        type: actionTypes.WAIT_START
    }
};

export const waitStop = () => {
    return {
        type: actionTypes.WAIT_STOP
    }
};


//Auth actionCreators
export const authSuccess = (userId, token) => {
    return {
        type: actionTypes.AUTH_SUCCESS, userId: userId, token: token
    }
};


export const auth = (userName, pass) => {

    return dispatch => {
        dispatch(waitStart());

        const data = {
            // this one is because firebase does not accept userName, only email is allowed so i had to put @a.com :D
            email: userName + "@a.com",
            password: pass,
            returnSecureToken: true
        };
        const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCc6ANAf-_4NDdvsTzJ12o8VvrLgdhL5Io';

        axios.post(url, data).then(res => {
                let response = res.data;
                localStorage.setItem('token', response.idToken);
                localStorage.setItem('userId', response.localId);

                dispatch(authSuccess(response.idToken, response.localId))
            }
        ).catch(err => {
            let msg;
            if (err.response) {
                msg = err.response.data.error.message
            } else {
                msg = err.message;
            }
            dispatch(authFail(msg))
        });

    }
};

export const authFail = err => {
    return {
        type: actionTypes.AUTH_FAIL, err: err
    }
};

export const checkIsAuth = () => {

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (token && userId) {
        return dispatch => {
            dispatch(authSuccess(userId, token))
        }
    } else {
        return dispatch => {
            dispatch(authFail())
        }
    }

};


// Get Posts actionCreators
export const getPosts = (id) => {
    return dispatch => {
        dispatch(waitStart());


        axios.get("https://jsonplaceholder.typicode.com/users").then(res => {
            dispatch(waitStop());
            const post = [...res.data]
            dispatch(getPostsSuccess(post))
        }).catch(err => {
            let msg;
            if (err.response) {
                msg = err.response.data.error.message
            } else {
                msg = err.message;
            }

            dispatch(getPostsFail(msg))
        })
    }

};

export const getPostsSuccess = (posts) => {
    return {
        type: actionTypes.GET_POSTS_SUCCESS, posts: posts
    }
};

export const getPostsFail = (err) => {
    return {
        type: actionTypes.GET_POSTS_FAIL, err: err
    }
};


// Get One Post ActionCreators
export const getOnePost = (id) => {

    return dispatch => {
        dispatch(waitStart());
        axios.get("https://jsonplaceholder.typicode.com/posts/" + id).then(res => {
                const post = res.data;
                dispatch(getOnePostSuccess(post));
            }
        ).catch(err => {
                let msg;
                if (err.response) {
                    msg = err.response.data.error.message
                } else {
                    msg = err.message;
                }
                dispatch(getOnePostfail(msg))
            }
        )
    }
};

export const getOnePostSuccess = post => {
    return {
        type: actionTypes.GET_ONE_POST_SUCCESS, post: post
    }
};


export const getOnePostfail = err => {
    return {
        type: actionTypes.GET_ONE_POST_FAIL, err: err
    }
};

