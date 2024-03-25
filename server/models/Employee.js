import mongoose, {Schema, model} from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    status:{
        type: String,
        required: true,
    },
    startOfWork:{
        type: String,
        required: true,
    },
    profession:{
        type: String,
        required: true,
    },
    schedule:{
        type: String,
        required: true,
    },
    employees:{
        type: [{ type: mongoose.Types.ObjectId }],
    },
    leader:{
        type: String,
    },
    allEducations:{
        type: [{ type: mongoose.Types.ObjectId, ref: 'Education'}],
        default: [],
    }
})

export default model('Employee', EmployeeSchema);