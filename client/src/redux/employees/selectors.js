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
      if (!employees) return [];

      const { name, status, training } = filter;

      const filteredByName = employees.filter(employee =>
        name
          ? employee?.fullName.toLowerCase().includes(name.toLowerCase())
          : true
      );

      const filteredByStatus = filteredByName.filter(employee => {
        if (status === "active") return employee.status === "активний";
        if (status === "not-active") return employee.status !== "активний";
        return true;
      });

      const sortedEmployees = filteredByStatus.sort((a, b) => {
        if (training) {
          const trainingCountA = a.allEducations.length;
          const trainingCountB = b.allEducations.length;
  
          if (training === "more") return trainingCountB - trainingCountA;
          if (training === "less") return trainingCountA - trainingCountB;
        }
  
        return 0;
      });
  
      return sortedEmployees;

    }
);