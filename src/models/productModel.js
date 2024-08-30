import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    email: {
        type: String,
        ref: "Userdetail",
        required: [true, "Please provide an email"],
        trim: true,
        lowercase: true,
        
    },
    type: {
        type: String,
        required: [true, "Please provide a type"],
        trim: true,
    },
    subtype: {
        type: String,
        trim: true,
        default: "N/A",  // Default value if not provided
    },
    size: {
        type: String,
        trim: true,
        enum: ["S", "M", "L", "XL", "XXL"],  // Optional enum for predefined sizes
        default: "M",
    },
    color: {
        type: String,
        trim: true,
        default: "N/A",  // Default value if not provided
    },
    prizerange: {
        type: Number,  
        min: [0, "Price range must be a positive number"],
    },
    image: {
        type: String,
        trim: true,
        default: "default.jpg",  // Default image if not provided
    },
    gender: {
        type: String,
        enum: ["m", "f", "c"],  // Male, Female, Child
        default: "f",
    },
    discount: {
        type: Number,
        min: [0, "Discount must be a positive number"],
        max: [100, "Discount cannot exceed 100%"],
        default: 0,
    },
    stockstatus: {
        type: String,
        enum: ["stock", "no-stock"],
        default: "no-stock",
    },
}, {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

// Index fields for optimized querying
productSchema.index({ email: 1 });
productSchema.index({ type: 1 });
productSchema.index({ stockstatus: 1 });

// Virtual for user details (if needed)
// productSchema.virtual('userdetails', {
//     ref: 'Userdetail',
//     localField: 'email',
//     foreignField: 'email',
//     justOne: true,
// });

// Pre-save hook (example if needed for custom logic)
// productSchema.pre('save', function(next) {
//     // Custom logic before saving
//     next();
// });

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
