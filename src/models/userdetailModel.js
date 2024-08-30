import mongoose from "mongoose";

const userdetailSchema = new mongoose.Schema({
    email: {
        type: String,
        ref: "User",
        required: [true, "Please provide an email"],
        unique: true,
        trim: true,  // Trim whitespace from the email
        lowercase: true,  // Convert the email to lowercase
    },
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,  // Trim whitespace from the name
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
        trim: true,  // Trim whitespace from the description
    },
    state: {
        type: String,
        required: [true, "Please provide a state"],
        trim: true,  // Trim whitespace from the state
    },
    city: {
        type: String,
        required: [true, "Please provide a city"],
        trim: true,  // Trim whitespace from the city
    },
    location: {
        type: String,
        required: [true, "Please provide a location"],
        trim: true,  // Trim whitespace from the location
    },
    landmark: {
        type: String,
        trim: true,  // Trim whitespace from the landmark
    },
    phone: {
        type: String,  // Changed to String to handle formatting issues
        required: [true, "Please provide a phone number"],
        trim: true,  // Trim whitespace from the phone number
    },
    image: {
        type: String,
        trim: true,  // Trim whitespace from the image URL
    },
    rating: {
        type: String,  // Changed to String to match enum values
        enum: ["5", "4", "3"],  // Rating options
        default: "3",  // Default rating
    },
    comment: {
        type: String,
        trim: true,  // Trim whitespace from the comment
    },
});

// Create an index on the email field for better performance
userdetailSchema.index({ email: 1 }, { unique: true });

// Export the Userdetail model
export const Userdetail = mongoose.models.Userdetail || mongoose.model("Userdetail", userdetailSchema);
