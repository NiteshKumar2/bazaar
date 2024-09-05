import { NextResponse } from "next/server";
import { connect } from "@/models/dbConfig";
import { Userdetail } from "@/models/userdetailModel";

// Establish the database connection
connect();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const ptype = searchParams.get("gender");

    if (!ptype) {
        return NextResponse.json(
            { error: "gender is required." },
            { status: 400 }
        );
    }

    try {
        // Fetch user details based on ptype
        const ptypeDetails = await Userdetail.find({ ptype: ptype.trim() });

        // Check if any documents were found
        if (ptypeDetails.length === 0) {
            return NextResponse.json(
                { error: "No user details found for the specified ptype." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                message: `User details found for gender: ${ptype}`,
                success: true,
                data: ptypeDetails,
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
