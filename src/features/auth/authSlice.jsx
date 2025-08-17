import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

    export const loginUser = createAsyncThunk(
        'auth/loginUser',
        async (Credentials, { rejectWithValue }) => {
            try {
                const response = await api.post('/api/login', Credentials);
                return response.data;
            } catch (error) {
                return rejectWithValue(error.response.data || 'gagal login');
            }
        }
    );

    const initialState = {
        isLoggedIn: false,
        user: null,
        loginTime: null,
    };

    const authSlice = createSlice({
        name: 'auth',
        initialState,
        reducer: {
            login: (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload;
                state.loginTime = Date.now();
            },
            logout: (state) => {
                state.isLoggedIn = false;
                state.user = null;
                state.loginTime = null;
            },
        },
    });

    export const { login, logout } = authSlice.actions;
    export default authSlice.reducer;