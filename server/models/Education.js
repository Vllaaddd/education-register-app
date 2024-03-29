import mongoose, {Schema, model} from "mongoose";

const EducationModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    instructor: {
        type: String,
        required: true,
    },
    date:{
        type: String,
        required: true,
    },
    startTime:{
        type: String,
        required: true,
    },
    endTime:{
        type: String,
        required: true,
    },
    materials: {
        type: String,
        default: "",
    },
    employees:{
        type: [{
            employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
            isCompleted: { type: Boolean, default: false }
        }],
        default: []
    }
}, {
    timestamps: true,
})

export default model('Education', EducationModel);