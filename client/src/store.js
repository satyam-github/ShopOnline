import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { productListReducer } from './reducers/productListReducer';
import { productDetailsReducer } from './reducers/productDetailsReducer';
import Cookie from 'js-cookie';
import { cartReducer } from './reducers/cartReducer';
import { userSigninReducer } from './reducers/userReducer';
import thunk from 'redux-thunk';
import { productSaveReducer } from './reducers/productSaveReducer';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userinfo") || '';

const initialState = { cart: { cartItems, shipping: {}, payment: {} }, userSignin: { userInfo } };

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userSigninReducer,
    productSave: productSaveReducer,
    productDelete: productSaveReducer
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;