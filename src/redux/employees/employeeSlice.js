import { createSlice } from "@reduxjs/toolkit";
import { importEmployees } from './operations'

const employeeSlice = createSlice({
    name: 'employeeSlice',
    initialState: {
        employees: [],
        isLoading: false,
        error: null,
    },
    extraReducers(builder){
        builder
            .addCase(importEmployees.fulfilled, (state, action) => {
                console.log(action);
                state.isLoading = false;
            })
            .addCase(importEmployees.pending, (state, action) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(importEmployees.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export const employeeReducer = employeeSlice.reducer;