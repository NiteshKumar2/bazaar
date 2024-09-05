import { NextResponse } from "next/server";
import { connect } from "@/models/dbConfig";
import { Userdetail } from "@/models/userdetailModel";

// Establish the database connection
connect();

export async function GET(request) {

    try {
        // Fetch user details based on city
        const cities = await Userdetail.distinct('city');

        return NextResponse.json(
            {
                message: `cities`,
                success: true,
                data: cities,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching cities details:", error);
        return NextResponse.json(
            { error: "Internal Server Error. Please try again later." },
            { status: 500 }
        );
    }
}

