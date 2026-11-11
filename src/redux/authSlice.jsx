import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import api from '../api/client'

function isTokenExpired(token) {
    try {
        const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        const { exp } = JSON.parse(atob(payload));
        return exp * 1000 <= Date.now()
    } catch (error) {
        return true;
    }
}

function loadAuth() {
    try {
        const saved = JSON.parse(localStorage.getItem('auth'));
        if (saved?.token && !isTokenExpired(saved.token)) return saved;
    } catch (error) {

    }
    return { token: null, user: null }
}

export const loginUser = createAsyncThunk('auth', async (credentials, { rejectWithValue }) => {
    try {
        const { data } = await api.post('/auth/login', credentials);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message ?? 'Giriş yapılamadı, tekrar deneyin');
    }
})


export const registerUser = createAsyncThunk('register', async (payload, { rejectWithValue }) => {
    try {
        const { data } = await api.post('/auth/register', payload);
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message ?? "Kayıt yapılamadı, tekrar deneyiniz");
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState: { ...loadAuth(), status: 'idle', error: null },
    reducers: {
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.status = 'idle';
            state.error = null;
        },
        clearAuthError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(isAnyOf(loginUser.pending, registerUser.pending), (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addMatcher(isAnyOf(loginUser.fulfilled, registerUser.fulfilled), (state, action) => {
                state.status = "succeeded";
                state.token = action.payload.accessToken;
                state.user = action.payload.user;
            })
            .addMatcher(isAnyOf(loginUser.rejected, registerUser.rejected), (state, action) => {
                state.status = "failed";
                state.error = action.payload ?? action.error.message;
            })
    }
})

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;