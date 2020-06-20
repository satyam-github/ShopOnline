import * as actionTypes from '../actions/actionTypes';

const initialState = {
    products: [],
    loading: false,
    error: ''
}

export function productListReducer(state=initialState, action) {

    switch(action.type) {
        case actionTypes.PRODUCT_LIST_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload
            }
        case actionTypes.PRODUCT_LIST_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default: 
            return state
    }
}
