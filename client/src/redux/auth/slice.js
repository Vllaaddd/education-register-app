import { createSlice } from "@reduxjs/toolkit";
import { errorUpdate, login, logout } from "./operations";

const slice = createSlice({
    name: 'authSlice',
    initialState: {
        user: null,
        token: null,
        isLoggedIn: false,
        error: null,
    },
    extraReducers(builder){
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.error = null;
                state.user = action.payload.user;
                state.token = action.payload.token
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.error;
                state.isLoggedIn = false;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                state.error = null;
                state.user = null;
                state.token = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.error = action.error;
                state.isLoggedIn = false;
            })
            .addCase(errorUpdate.fulfilled, (state) => {
                state.error = null;
            })
    }
})

export const authReducer = slice.reducer;