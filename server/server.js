import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { clearAllEducations, deleteAllEmployees, findSome, getAll, getOne, importAll, removeOne, updateEmployee } from './controllers/EmployeeController.js';
import { addOneEducation, getAllEducations, getOneEducation, removeOneEducation, updateOneEducation, findSomeEducation, deleteAllEducations, changeIsCompleted } from './controllers/EducationController.js'
import createDocument from './controllers/DocumentControler.js'
import { employeeValidation, loginValidation } from './validations.js';

import { login, logout } from './controllers/UserControler.js'
import cookieParser from 'cookie-parser';


const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb+srv://vladikhoncharuk:zJlIhnE8ch172Aa3@educationregisterdb.kxjit9j.mongodb.net/?retryWrites=true&w=majority&appName=EducationRegisterDB')

app.get('/importEmployees/:sheetsId', importAll)
app.get('/employees', getAll)
app.get('/employees/:id', getOne)
app.get('/employeesByName/:name', findSome)
app.put('/employees/:id', updateEmployee)
app.delete('/employeeDelete/:id', removeOne)
app.delete('/employees', deleteAllEmployees)
app.delete('/clearAllEducations', clearAllEducations);

app.post('/auth/login', loginValidation, login)
app.post('/auth/logout', logout)

app.post('/education', addOneEducation)
app.get('/education', getAllEducations)
app.get('/education/:id', getOneEducation)
app.post('/education/:updateId', updateOneEducation)
app.post('/educations/:id', changeIsCompleted)
app.delete('/education/:id', removeOneEducation)
app.get('/educationByName/:name', findSomeEducation)
app.delete('/educations', deleteAllEducations)

app.post('/createDocument', createDocument)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});