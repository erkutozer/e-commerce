import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    products: [],
    search: ''
}

export const getAllProducts = createAsyncThunk('product', async () => {
    const response = await axios.get("https://dummyjson.com/products");
    return response.data.products;
})

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        })
    }
})

export const { setSearch } = productSlice.actions;
export default productSlice.reducer;