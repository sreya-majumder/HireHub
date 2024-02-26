import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    last: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    city: {
        type: String,
        required: [true, "Please provide a password"],
    },
    country: {
        type: String,
        required: [true, "Please provide a password"],
    },
    number: {
        type: String,
        required: [true, "Please provide a password"],
    },
    number: {
        type: String,
        required: [true, "Please provide a password"],
    },
    age: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;