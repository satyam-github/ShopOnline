import * as actionTypes from './actionTypes';
import Cookie from "js-cookie";
import axios from 'axios';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
    try {
        const res = await axios.get("/api/products/" + productId);
        dispatch({
            type: actionTypes.CART_ADD_ITEM,
            payload: {
                product: res.data._id,
                name: res.data.name,
                image: res.data.image,
                price: res.data.price,
                countInStock: res.data.countInStock,
                qty
            }
        });
        const {cart: {cartItems}} = getState();
        Cookie.set("cartItems", JSON.stringify(cartItems));
    } catch (error) {

    }
}

export const saveShipping = (data) => (dispatch) => {
    dispatch({ 
        type: actionTypes.CART_SAVE_SHIPPING,  
        payload: data
    });
}

export const savePayment = (data) => (dispatch) => {
    dispatch({
        type: actionTypes.CART_SAVE_PAYMENT,
        payload: data
    });
}

export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.CART_REMOVE_ITEM,
        payload: productId
    });
    const {cart: {cartItems}} = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
}