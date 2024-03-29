import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { addEducation, changeIsCompleted, deleteAll, getAllEducations } from "./operations";

const slice = createSlice({
    name: 'educationSlice',
    initialState: {
        educations: [],
        isLoading: false,
        error: null,
    },
    extraReducers(builder){
        builder
        .addCase(addEducation.fulfilled, (state, action) => {
            state.educations.push(action.payload)
        })
        .addCase(getAllEducations.fulfilled, (state, action) => {
            state.educations = action.payload
        })
        .addCase(deleteAll.fulfilled, (state) => {
            state.educations = []
        })
        .addCase(changeIsCompleted.fulfilled, (state, action) => {
            state.educations = state.educations.map(education =>
                education._id === action.payload._id ? action.payload : education
            );
        })
        .addMatcher(isAnyOf(addEducation.pending, getAllEducations.pending, deleteAll.pending, changeIsCompleted.pending), (state) => {
            state.isLoading = true;
        })
        .addMatcher(isAnyOf(addEducation.rejected, getAllEducations.rejected, deleteAll.rejected, changeIsCompleted.rejected), (state, action) => {
            state.error = action.payload;
        })
        .addMatcher(isAnyOf(addEducation.fulfilled, getAllEducations.fulfilled, deleteAll.fulfilled, changeIsCompleted.fulfilled), (state) => {
            state.isLoading = false;
            state.error = null;
        })
    }
})

export const educationReducer = slice.reducer;