import axios from 'axios';
import {createMessage, returnErrors} from "./messages";

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL, ADD_LEADS
} from "./types";


// Check Token and load user
export const loadUser = () => (dispatch,getState) => {
    // User Loading
    dispatch({
        type: USER_LOADING
    });
    
    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        })
        .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: AUTH_ERROR
        })
    })
};

// LOGIN USER
export const login = (username, password) => (dispatch) => {

    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request Body
    const body = JSON.stringify({username, password}); // same as {username:username, password:password}

    axios.post('/api/auth/login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL
            })
        })
};

// REGISTER USER
export const register = ({username,email, password}) => (dispatch) => {

    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // Request Body
    const body = JSON.stringify({username, email, password}); // same as {username:username, password:password}

    axios.post('/api/auth/register', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGISTER_FAIL
            })
        })
};



//LOGOUT USER
export const logout = () => (dispatch,getState) => {

    axios.post('/api/auth/logout/', null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS,
            });
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        })
};

export const updateEmail = ({username,email}) => (dispatch, getState) => {

    // Request Body
    const body = JSON.stringify({username, email}); // same as {username:username, password:password}

    axios.post('/api/auth/user', body, tokenConfig(getState))
        .then(res => {
            dispatch(createMessage({addLead: "Email Updated to " + email}));
        }).catch(
        err => dispatch(returnErrors(err.response.data,err.response.status))
    );
    // console.log('updating email ' + username + email)
};




// Setup config with token - helper function
export const tokenConfig = getState => {
    // Get token from state
    const token = getState().auth.token;

    //Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    //If token, add to headers config
    if (token){
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config

};