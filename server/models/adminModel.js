import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
       
    },
    mobile: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "default-profile.png"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ["user", "admin", "mentor"],
        default: "user"
    }
}, { timestamps: true });

export const Admin = mongoose.model("Admin", adminSchema);
