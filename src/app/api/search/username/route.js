// todo direct product page open
import { NextResponse } from "next/server";
import { connect } from "@/models/dbConfig";
import { Userdetail } from "@/models/userdetailModel";

// Establish the database connection
connect();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");

    if (!name) {
        return NextResponse.json(
            { error: "name is required." },
            { status: 400 }
        );
    }

    try {
        // Fetch user details based on name
        const nameDetails = await Userdetail.find({ name: name.trim() });

        // Check if any documents were found
        if (nameDetails.length === 0) {
            return NextResponse.json(
                { error: "No user details found for the specified name." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: `User details found for name: ${name}`,
                success: true,
                data: nameDetails,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching user details:", error);
        return NextResponse.json(
            { error: "Internal Server Error. Please try again later." },
            { status: 500 }
        );
    }
}
