import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { clearAllEducations, deleteAll, deleteOneEmployee, getAllEmployees, importEmployees, updateEmployee } from "./operations";

const slice = createSlice({
    name: 'employeeSlice',
    initialState: {
        employees: [],
        isLoading: false,
        error: null,
    },
    extraReducers(builder){
        builder
            .addCase(importEmployees.fulfilled, (state, action) => {
                state.employees.push(action.payload.employees)
            })
            .addCase(getAllEmployees.fulfilled, (state, action) => {
                state.employees = action.payload
            })
            .addCase(deleteAll.fulfilled, (state) => {
                state.employees = [];
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.employees = state.employees.map(employee =>
                    employee._id === action.payload._id ? action.payload : employee
                );
            })
            .addCase(clearAllEducations.fulfilled, (state, action) => {
                state.employees = action.payload
            })
            .addCase(deleteOneEmployee.fulfilled, (state, action) => {
                state.employees = state.employees.filter(employee => employee._id !== action.payload._id)
            })
            .addMatcher(isAnyOf(importEmployees.pending, getAllEmployees.pending, deleteAll.pending, deleteOneEmployee.pending, updateEmployee.pending, clearAllEducations.pending), (state) => {
                state.isLoading = true;
            })
            .addMatcher(isAnyOf(importEmployees.rejected, getAllEmployees.rejected, deleteAll.rejected, deleteOneEmployee.rejected, updateEmployee.rejected, clearAllEducations.rejected), (state, action) => {
                state.error = action.payload;
            })
            .addMatcher(isAnyOf(importEmployees.fulfilled, getAllEmployees.fulfilled, deleteAll.fulfilled, deleteOneEmployee.fulfilled, updateEmployee.fulfilled, clearAllEducations.fulfilled), (state) => {
                state.isLoading = false;
                state.error = null;
            })
    }
})

export const employeeReducer = slice.reducer;