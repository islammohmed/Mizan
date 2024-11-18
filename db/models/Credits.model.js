import mongoose from "mongoose";
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, 'name is too short'],
        maxLength: [100, 'name is too long']
    },
    reason: {
        type: String,
        required: true,
    },
    allocation: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    }
}, { timestamps: true })

export const CreditsModel = mongoose.model('Credits', schema)
