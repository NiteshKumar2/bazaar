import { NextResponse } from "next/server";
import { connect } from "@/models/dbConfig";
import { User } from "@/models/userModel";

await connect(); // Ensure the database connection is established

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { email, token } = reqBody;

        // Input validation
        if (!email || !token) {
            return NextResponse.json(
                { error: "Email and token are required" },
                { status: 400 }
            );
        }

        console.log("Verifying token for email:", email);

        // Find the user with the provided email, token, and token expiry
        const user = await User.findOne({
            email,
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            console.log("Invalid token or user not found");
            return NextResponse.json(
                { error: "Invalid token" },
                { status: 400 }
            );
        }

        console.log("User found:", user);

        // Update user verification status
        user.isVerified = true; // Ensure correct spelling
        user.verifyToken = undefined; // Clear the verification token
        user.verifyTokenExpiry = undefined; // Clear the token expiry
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        });

    } catch (error) {
        console.error("Error during email verification:", error); // Log the error for debugging
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
