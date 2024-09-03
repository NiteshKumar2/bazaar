import { NextResponse } from "next/server";
import { connect } from "@/models/dbConfig";
import { Userdetail } from "@/models/userdetailModel";

// Establish the database connection
connect();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("location");

    if (!city) {
        return NextResponse.json(
            { error: "Location (city) is required." },
            { status: 400 }
        );
    }

    try {
        // Fetch user details based on city
        const cityDetails = await Userdetail.find({ city: city.trim() });

        // Check if any documents were found
        if (cityDetails.length === 0) {
            return NextResponse.json(
                { error: "No user details found for the specified city." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: `User details found for city: ${city}`,
                success: true,
                data: cityDetails,
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
