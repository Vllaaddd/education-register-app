import mongoose from "mongoose";

const { Schema, model } = mongoose;

const EmployeeSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    startOfWork: {
        type: String,
        required: true,
    },
    profession: {
        type: String,
        required: true,
    },
    schedule: {
        type: String,
        required: true,
    },
    employees: [{
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    }],
    leader: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
    },
    allEducations: [{
        type: Schema.Types.ObjectId,
        ref: 'Education'
    }],
});

export default model('Employee', EmployeeSchema);
