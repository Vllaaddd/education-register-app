import { configureStore } from "@reduxjs/toolkit";
import { employeeReducer } from "./employees/employeeSlice";

export const store = configureStore({
  reducer: {
    employees: employeeReducer
  },
})