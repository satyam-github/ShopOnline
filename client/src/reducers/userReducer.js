import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    userInfo: null,
    error: null
}

export function userSigninReducer(state=initialState, action) {
    switch(action.type) {
        case actionTypes.USER_SIGNIN_START :
        case actionTypes.USER_REGISTER_START :
            return {
                ...state,
                loading: true
            }
        case actionTypes.USER_SIGNIN_SUCCESS :
        case actionTypes.USER_REGISTER_SUCCESS :
            return {
                ...state,
                loading: false,
                userInfo: action.payload
            }
        case actionTypes.USER_SIGNIN_FAIL :
        case actionTypes.USER_REGISTER_FAIL :
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default :    
            return state
    }
}