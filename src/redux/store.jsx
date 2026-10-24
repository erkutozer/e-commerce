import { configureStore } from "@reduxjs/toolkit";
import productReducer from './productSlice'
import basketReducer from './basketSlice'

export const store = configureStore({
    reducer: {
        products: productReducer,
        basket: basketReducer
    }
})