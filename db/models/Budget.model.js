import mongoose from "mongoose";
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, 'name is too short'],
        maxLength: [100, 'name is too long']
    },
    desc: {
        type: String,
        required: true,
    },
    allocation: {
        type: Number,
        required: true,
    },
    expenses: {
        type: Number,
        default: 0,
    },
}, { timestamps: true })

export const budgetModel = mongoose.model('budget', schema)
