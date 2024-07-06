import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const setAuthHeader = token => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
    axios.defaults.headers.common.Authorization = '';
};

export const login = createAsyncThunk('auth/login', async (body, thunkAPI) => {
    try {
        const res = await axios.post(`http://localhost:5000/auth/login`, body)
        setAuthHeader(res.data.token);
        if(res.data.redirectTo){
            window.location.href = res.data.redirectTo
        }
        return res.data;
    } catch (error) {
        throw new Error(error)
    }
})

export const logout = createAsyncThunk('auth/logout', async (thunkAPI) => {
    try {
        const res = await axios.post(`http://localhost:5000/auth/logout`)
        clearAuthHeader()
        return res.data
    } catch (error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

export const errorUpdate = createAsyncThunk('auth/errorUpdate', async (_, thunkAPI) => {
    try {
        return {success: true}
    } catch (error) {
        throw new Error(error)
    }
})