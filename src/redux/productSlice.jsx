import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/client";


const initialState = {
    products: [],
    searchTerm: '',
    status: 'idle',
    error: null,
    page: 0,
    totalPages: 0,
    totalElements: 0,
}

export const getAllProducts = createAsyncThunk('product', async ({ search, page }, { signal }) => {
    const response = await api.get('/products', {
        params: { search: search || undefined, page, size: 12 }, signal
    });
    return response.data;
})

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.searchTerm = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state) => {
            state.status = 'loading';
        }),
            builder.addCase(getAllProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ?? "Beklenmeyen bir hata oluştu"
            }),

            builder.addCase(getAllProducts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.products = action.payload.content;
                state.totalPages = action.payload.totalPages;
                state.totalElements = action.payload.totalElements;
            })
    }
})

export const { setSearch, setPage } = productSlice.actions;
export default productSlice.reducer;