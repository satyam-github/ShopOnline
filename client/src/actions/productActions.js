import * as actionTypes from './actionTypes';
import axios from 'axios';

export const listProducts = () => async (dispatch) => {
    
    try {
        dispatch({
            type: actionTypes.PRODUCT_LIST_START
        });
        const res = await axios.get("/api/products");
        dispatch({
            type: actionTypes.PRODUCT_LIST_SUCCESS,
            payload: res.data
        });
    } catch (error) {
        console.log("Error: ", error.message);
        dispatch({
            type: actionTypes.PRODUCT_LIST_FAIL,
            error: error.message
        });
    }
}

export const saveProduct = (product) => async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.PRODUCT_SAVE_START, payload: product });
      const { userSignin: { userInfo } } = getState();
      if (!product._id) {
        const { data } = await axios.post('/api/products', product, {
          headers: {
            'Authorization': 'Bearer ' + userInfo.token
          }
        });
        dispatch({ type: actionTypes.PRODUCT_SAVE_SUCCESS, payload: data });
      } else {
        const { data } = await axios.put('/api/products/' + product._id, product, {
          headers: {
            'Authorization': 'Bearer ' + userInfo.token
          }
        });
        dispatch({ type: actionTypes.PRODUCT_SAVE_SUCCESS, payload: data });
      }
  
    } catch (error) {
  
      dispatch({ type: actionTypes.PRODUCT_SAVE_FAIL, payload: error.message });
    }
  }

export const productDetails = (productId) => async (dispatch) => {
    try {
        dispatch({
            type: actionTypes.PRODUCT_DETAIL_START
        });
        const res = await axios.get("/api/products/" + productId);
        dispatch({
            type: actionTypes.PRODUCT_DETAIL_SUCCESS,
            payload: res.data
        });

    } catch (error) {
        dispatch({
            type: actionTypes.PRODUCT_DETAIL_FAIL,
            payload: error.message
        });
    }
}

export const deleteProduct = (productId) => async (dispatch, getState) => {
    try {
      const { userSignin: { userInfo } } = getState();
      dispatch({ type: actionTypes.PRODUCT_DELETE_START, payload: productId });
      const { data } = await axios.delete("/api/products/" + productId, {
        headers: {
          Authorization: 'Bearer ' + userInfo.token
        }
      });
      dispatch({ type: actionTypes.PRODUCT_DELETE_SUCCESS, payload: data, success: true });
    } catch (error) {
      dispatch({ type: actionTypes.PRODUCT_DELETE_FAIL, payload: error.message });
  
    }
  }






