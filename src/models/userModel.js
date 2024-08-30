const { default: mongoose } = require("mongoose");

const userModel = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        trim: true, // Remove extra spaces
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        lowercase: true, // Store email in lowercase
        match: [/.+@.+\..+/, "Please provide a valid email address"], // Email format validation
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [6, "Password must be at least 6 characters long"], // Minimum length for password
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
}, { timestamps: true }); // Automatically manage createdAt and updatedAt


export const User = mongoose.models.User || mongoose.model("User", userModel);
