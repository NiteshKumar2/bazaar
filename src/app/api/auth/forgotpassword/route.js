import { NextResponse } from "next/server";
import { connect } from "@/models/dbConfig";
import { User } from "@/models/userModel";
import { sendEmail } from "@/helper/mail";

await connect(); // Ensure the database connection is established

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { email } = reqBody;

        // Input validation
        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        // Check if user exists
        const user = await User.findOne({ email });

        if (user) {
            console.log("User found with ID:", user._id);

            // Send verification email
            await sendEmail({ email, emailType: "RESET", userId: user._id });
            return NextResponse.json(
                { message: "Reset request sent" },
                { status: 200 }
            );
        }

        console.log("User not found");
        return NextResponse.json(
            { error: "User does not exist" },
            { status: 400 }
        );

    } catch (error) {
        console.error("Error during password reset request:", error); // Log the error for debugging
        return NextResponse.json(
            { error: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
