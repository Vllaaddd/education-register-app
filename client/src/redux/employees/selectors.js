import { createSelector } from "@reduxjs/toolkit";

export const selectEmployees = state => {
    return state.employees.employees;
}

export const selectIsLoading = state => {
    return state.employees.isLoading;
}

export const selectFilter = state => state.filter;

export const selectVisibleEmployees = createSelector(
    [selectEmployees, selectFilter],
    (employees, filter) => {
      return employees.filter(
        employee => employee?.fullName && employee?.fullName.includes(filter)
      );
    }
  );
  