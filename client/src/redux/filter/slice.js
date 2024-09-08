import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
    name: 'filterSlice',
    initialState: {
      name: '',
      training: '',
      status: '',
    },
    reducers: {
      filterUpdate(state, action){
        return state = {
          ...state,
          name: action.payload,
        }
      },
      filterEmployees(state, action){
        const { training, status } = action.payload;
        return {
          ...state,
          training,
          status,
        };
      }
    },

})

export const filterReducer = slice.reducer;
export const { filterUpdate, filterEmployees } = slice.actions