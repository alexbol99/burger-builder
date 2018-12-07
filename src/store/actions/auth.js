import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_STARTED
    }
};

export const authSucceed = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCEED,
        token,
        userId
    }
};

export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout( () => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email:email,
            password:password,
            returnSecureToken: true
        };
        const url = isSignUp ?
            "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCITlJfFbDTV36Iybr3OgfCLUxP0at73gI" :
            "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCITlJfFbDTV36Iybr3OgfCLUxP0at73gI"
        axios.post(url, authData)
            .then( response => {
                console.log(response);
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSucceed(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch( error => {
                console.log(error.response.data.error);
                dispatch(authFailed(error.response.data.error))
            })
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        }
        else {
            const userId = localStorage.getItem('userId');
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate > new Date()) {
                const timeLeft = expirationDate.getTime() - new Date().getTime()
                dispatch(authSucceed(token, userId));
                dispatch(checkAuthTimeout(timeLeft / 1000));
            }
            else {
                dispatch(logout());
            }
        }
    }
}
