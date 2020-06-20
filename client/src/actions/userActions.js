import * as actionTypes from './actionTypes';
import Cookie from 'js-cookie';
import Axios from 'axios';

export const signin = (email, password) => async dispatch => {
    dispatch({
        type: actionTypes.USER_SIGNIN_START,
        payload: {
            email,
            password
        }
    });
    try {
        const res = await Axios.post('/api/users/signin', { email, password });
        dispatch({
            type: actionTypes.USER_SIGNIN_SUCCESS,
            payload: res.data
        });
        Cookie.set('userinfo', JSON.stringify(res.data));
    } catch (error) {
        dispatch({
            type: actionTypes.USER_SIGNIN_FAIL,
            payload: error.message
        });
    }
}

export const register = ( name, email, password ) => async dispatch => {
    dispatch({
        type: actionTypes.USER_REGISTER_START,
    });
    try {
        const res = await Axios.post('/api/users/register', { name, email, password });
        dispatch({
            type: actionTypes.USER_REGISTER_SUCCESS,
            payload: res.data
        });
        Cookie.set('userinfo', JSON.stringify(res.data));
    } catch (error) {
        dispatch({
            type: actionTypes.USER_REGISTER_FAIL,
            payload: error.message
        });
    }
}