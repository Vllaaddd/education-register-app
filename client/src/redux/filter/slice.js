import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: 'filterSlice',
    initialState: '',
    reducers: {
      filterUpdate(state, action){
        return state = action.payload
      }
    },
})

export const filterReducer = slice.reducer;
export const { filterUpdate } = slice.actions