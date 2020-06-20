import * as actionTypes from '../actions/actionTypes';

const initialState = {
    product: {},
    loading: false,
    error: ''
}

export function productDetailsReducer(state=initialState, action) {

    switch(action.type) {
        case actionTypes.PRODUCT_DETAIL_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PRODUCT_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                product: action.payload
            }
        case actionTypes.PRODUCT_DETAIL_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default: 
            return state
    }
}
