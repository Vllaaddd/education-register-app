import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const importEmployees = createAsyncThunk('employees/importEmployees', async (sheetsId, thunkAPI) => {
    try {
        const res = await axios.get(`http://localhost:5000/importEmployees/${sheetsId}`)
        return res.data
    } catch (error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

export const getAllEmployees = createAsyncThunk('employees/getAllEmployees', async(_, thunkAPI) => {
    try {
        const res = await axios.get('http://localhost:5000/employees')
        return res.data
    } catch (error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

export const updateEmployee = createAsyncThunk('employees/updateEmployee', async(data, thunkAPI) => {
    const { employeeId, updateData } = data
    try {
        const res = await axios.put(`http://localhost:5000/employees/${employeeId}`, updateData)
        return res.data
    } catch (error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

export const deleteOneEmployee = createAsyncThunk('employees/deleteOneEmployee', async(employeeId, thunkAPI) => {
    try {
        const res = await axios.delete(`http://localhost:5000/employeeDelete/${employeeId}`)
        return res.data
    } catch (error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

export const deleteAll = createAsyncThunk('employees/deleteAll', async(_, thunkAPI) => {
    try {
        const res = await axios.delete('http://localhost:5000/employees')
        return res.data
    } catch (error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

export const clearAllEducations = createAsyncThunk('employees/clearEducations', async(_, thunkAPI) => {
    try {
        const res = await axios.delete('http://localhost:5000/clearAllEducations')
        return res.data
    } catch (error) {
        thunkAPI.rejectWithValue(error.message);
    }
})