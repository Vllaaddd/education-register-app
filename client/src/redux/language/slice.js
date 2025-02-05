import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: 'languageSlice',
    initialState: {
      lng: ''
    },
    reducers: {
      languageUpdate(state, action){
        return state = {
          ...state,
          lng: action.payload.language
        }
      },
    },

})

export const languageReducer = slice.reducer;
export const { languageUpdate } = slice.actions