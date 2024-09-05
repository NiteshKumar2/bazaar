import { NextResponse } from "next/server";
import { connect } from "@/models/dbConfig";
import { Userdetail } from "@/models/userdetailModel";

// Establish the database connection
connect();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    // Check if the query parameter is provided
    if (!query) {
        return NextResponse.json(
            { error: "Input is required." },
            { status: 400 }
        );
    }

    try {
        // Use Mongoose find method to search for user details
        const searchDetails = await Userdetail.find({
            search: { $regex: new RegExp(query, "i") } // Case-insensitive search
        });

        // Check if any documents were found
        if (searchDetails.length === 0) {
            return NextResponse.json(
                { error: "No user details found for the specified query." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: `User details found for query: "${query}"`,
                success: true,
                data: searchDetails,
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
