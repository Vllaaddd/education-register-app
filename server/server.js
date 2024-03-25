import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import { findSome, getAll, getOne, importAll, removeOne, updateEmployee } from './controllers/EmployeeController.js';
import createDocument from './controllers/DocumentControler.js'
import { employeeValidation, loginValidation } from './validations.js';

import { login, profile } from './controllers/UserControler.js'
import { addOneEducation, getAllEducations, getOneEducation, removeOneEducation, updateOneEducation, findSomeEducation } from './controllers/EducationController.js'
import cookieParser from 'cookie-parser';
import { validateToken } from './JWT.js';


const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser())

mongoose.connect('mongodb+srv://vladikhoncharuk:zJlIhnE8ch172Aa3@educationregisterdb.kxjit9j.mongodb.net/?retryWrites=true&w=majority&appName=EducationRegisterDB')

app.get('/importEmployees/:sheetsId', employeeValidation, importAll)
app.get('/employees', getAll)
app.get('/employees/:id', getOne)
app.get('/employeesByName/:name', findSome)
app.put('/employees/:id', updateEmployee)
app.delete('/employeeDelete/:id', removeOne)

app.post('/auth/login', loginValidation, login)
app.get('/auth/profile', validateToken, profile)

app.post('/education', addOneEducation)
app.get('/education', getAllEducations)
app.get('/education/:id', getOneEducation)
app.post('/education/:updateId', updateOneEducation)
app.delete('/education/:id', removeOneEducation)
app.get('/educationByName/:name', findSomeEducation)

app.post('/createDocument', createDocument)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});