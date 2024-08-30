import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/models/dbConfig";
import { User } from "@/models/userModel";

await connect(); // Ensure the database connection is established

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Input validation
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        console.log(reqBody);

        // Check if user exists and is verified
        const user = await User.findOne({ email, isVerified: true });
        if (!user) {
            return NextResponse.json(
                { error: "User is not verified or does not exist" },
                { status: 400 }
            );
        }
        console.log("User exists");

        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 400 }
            );
        }
        console.log(user);

        // Create token data here (JWT or session management can be implemented)

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            userId: user._id, // Optionally return user ID
        });

        return response;

    } catch (error) {
        console.error("Error during login:", error); // Log error for debugging
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
