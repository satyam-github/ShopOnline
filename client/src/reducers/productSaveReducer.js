
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    product: {},
    loading: false,
    success: false,
    error: null
}

export function productSaveReducer(state=initialState, action) {
    switch (action.type) {
        case actionTypes.PRODUCT_SAVE_START:
        case actionTypes.PRODUCT_DELETE_START:
          return { loading: true };
        case actionTypes.PRODUCT_SAVE_SUCCESS:
        case actionTypes.PRODUCT_DELETE_SUCCESS:
          return { loading: false, success: true, product: action.payload };
        case actionTypes.PRODUCT_SAVE_FAIL:
        case actionTypes.PRODUCT_DELETE_FAIL:
          return { loading: false, error: action.payload }
        default:
          return state;
      }
}