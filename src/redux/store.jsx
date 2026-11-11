import { configureStore } from "@reduxjs/toolkit";
import productReducer from './productSlice'
import basketReducer from './basketSlice'
import authReducer from './authSlice'

export const store = configureStore({
    reducer: {
        products: productReducer,
        basket: basketReducer,
        auth: authReducer
    }
})

let previousAuth = store.getState().auth;
store.subscribe(() => {
    const { auth } = store.getState();
    if (auth === previousAuth) return;
    previousAuth = auth;
    if (auth.token) {
        localStorage.setItem('auth', JSON.stringify({ token: auth.token, user: auth.user }));
    } else {
        localStorage.removeItem('auth');
    }
})