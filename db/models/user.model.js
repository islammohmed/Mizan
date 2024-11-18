import bcrypt from 'bcrypt'
import mongoose from "mongoose";
const budgetPermissionSchema = new mongoose.Schema({
    budgetId: {
        type: mongoose.Types.ObjectId,
        ref: 'budget',
        required: true
    },
    permission: {
        type: String,
        enum: ['view', 'edit'],
        default: 'view',
        required: true
    }
});
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, 'name is too short'],
        maxLength: [20, 'name is too long']
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        lowercase: true,
        required: true
    },
    budgets: [budgetPermissionSchema]
}, { timestamps: true })
schema.pre('save', function () {
    this.password = bcrypt.hashSync(this.password, 8)
})
export const userModel = mongoose.model('user', schema)
