import * as actionTypes from '../actions/actionTypes';

const initialState = {
    cartItems: [],
    shipping: null,
    payment: null
}

export function cartReducer(state=initialState, action) {
    switch(action.type) {
        case actionTypes.CART_ADD_ITEM:
            const item= action.payload;
            const product = state.cartItems.find(cartItem => cartItem.product === item.product);
            if(product) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === product.product ? item : x)
                }
            }
            return {
                cartItems: [...state.cartItems, item]
            }
        case actionTypes.CART_REMOVE_ITEM :
            return {
                cartItems: state.cartItems.filter(item => item.product !== action.payload)
            }
        case actionTypes.CART_SAVE_SHIPPING :
            return {
                ...state,
                shipping: action.payload
            }
        case actionTypes.CART_SAVE_PAYMENT:
            return {
                ...state,
                payment: action.payload
            } 
        default:
            return state;
    }
}