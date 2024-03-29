import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const addEducation = createAsyncThunk('educations/addEducation', async (body, thunkAPI) => {
    try {
        const res = await axios.post(`http://localhost:5000/education`, body)
        return res.data
    } catch (error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

export const getAllEducations = createAsyncThunk('educations/getAllEducations', async(_, thunkAPI) => {
    try {
        const res = await axios.get('http://localhost:5000/education')
        return res.data
    } catch (error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

export const deleteAll = createAsyncThunk('educations/deleteAll', async(_, thunkAPI) => {
    try {
        const res = await axios.delete('http://localhost:5000/educations')
        return res.data
    } catch (error) {
        thunkAPI.rejectWithValue(error.message);
    }
})

export const changeIsCompleted = createAsyncThunk('educations/changeIsCompleted', async(body, thunkAPI) => {
    const { educationId, ...rest } = body
    try {
        const res = await axios.post(`http://localhost:5000/educations/${educationId}`, rest)
        return res.data
    } catch (error) {
        thunkAPI.rejectWithValue(error.message);
    }
})