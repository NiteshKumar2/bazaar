import { NextResponse } from "next/server";
import { connect } from "@/models/dbConfig";
import { User } from "@/models/userModel";
import bcryptjs from "bcryptjs";

await connect(); // Ensure the database connection is established

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { email, token, password } = reqBody;

        // Input validation
        if (!email || !token || !password) {
            return NextResponse.json(
                { error: "Email, token, and password are required" },
                { status: 400 }
            );
        }

        // Find user with the provided email, token, and token expiry
        const user = await User.findOne({
            email,
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            console.log("Invalid token or user not found");
            return NextResponse.json(
                { error: "Invalid token" },
                { status: 400 }
            );
        }
        console.log("User found for password reset:", user);

        // Hash the new password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Update user fields
        user.isVerified = true; // Ensure correct spelling
        user.forgotPasswordToken = undefined; // Clear the token
        user.forgotPasswordTokenExpiry = undefined; // Clear the expiry
        user.password = hashedPassword; // Set the new password
        await user.save();

        return NextResponse.json({
            message: "Password reset successfully",
            success: true
        });

    } catch (error) {
        console.error("Error during password reset:", error); // Log the error for debugging
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
