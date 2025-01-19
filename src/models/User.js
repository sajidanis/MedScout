import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    aadhar: {
        type: Number,
        required: true,
        unique: true
    },
    avatar: {
        type: String
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role'
    },
    resetPasswordLink: {
        type: String
    },
    activated: {
        type: String,
        enum: ["YES", "NO"],
        default: "NO"
    },
    activationLink: {
        type: String
    }
}, {timestamps: true});

export const User = mongoose.model('user', userSchema);