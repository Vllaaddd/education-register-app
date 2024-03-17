import { createAsyncThunk } from "@reduxjs/toolkit";
import EmployeeModel from '../../models/Employee';

export const importEmployees = createAsyncThunk('employees/importEmployees', async (sheetsId, thunkAPI) => {
    try {
        
        const sheetTitle = 'Sheet1';
        const sheetRange = 'A2:N1000';
        const fullUrl = 'https://docs.google.com/spreadsheets/d/' + sheetsId + '/gviz/tq?sheet=' + sheetTitle + '&range=' + sheetRange;
        
        const response = await fetch(fullUrl);
        const rep = await response.text();
        const data = JSON.parse(rep.substring(47).slice(0, -2));
        
        const employees = [];
        const leaders = {};
        
        
        for (const employee of data.table.rows) {
            const fullName = employee.c[0].v;
            const status = employee.c[1].v;
            const startOfWork = employee.c[2].v;
            const profession = employee.c[3].v;
            const schedule = employee.c[7].v;
            const email = employee.c[12].v;
            const leader = employee.c[13].v;
                
            console.log('before creating');
            try {
                const savedEmployee = await EmployeeModel.create({
                    fullName, 
                    email,
                    status, 
                    startOfWork, 
                    profession, 
                    schedule, 
                    leader,
                })   
                if (!leaders[leader]) {
                    leaders[leader] = [];
                }
                leaders[leader].push(savedEmployee);
            
                employees.push(savedEmployee);
            } catch (error) {
                console.log(error);
            }

            console.log('after creating');
        }
        console.log('After for');

        employees.forEach(async (employee) => {
            const name = employee.fullName;
            const subordinates = leaders[name] || [];
            
            await EmployeeModel.findByIdAndUpdate(employee._id, { employees: subordinates });
        });

        console.log('before return');
        return employees;
    } catch (error) {
        thunkAPI.rejectWithValue(error.message);
    }
})