import { NextResponse } from "next/server";
import { connect } from "@/models/dbConfig";
import { Userdetail } from "@/models/userdetailModel";
import { User } from "@/models/userModel";

// Establish the database connection
connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { email, name, description, state, city, location, landmark, phone, image, rating,comment,ptype  } = reqBody;

        // Validate required fields
        if (!email || !name || !description || !state || !city || !location || !phone || !ptype) {
            return NextResponse.json(
                { error: "All fields are required." },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format." },
                { status: 400 }
            );
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "User does not exist." },
                { status: 404 }
            );
        }

        // Check if user details already exist
        const userdetailExists = await Userdetail.findOne({ email });
        if (userdetailExists) {
            return NextResponse.json(
                { error: "User details already exist." },
                { status: 400 }
            );
        }

        // Create new user details
        const newUserDetail = new Userdetail({
            email,
            name,
            description,
            state,
            city,
            location,
            landmark,
            phone,
            image,
            rating,
            comment,
            ptype
        });

        // Save the user details
        const savedUserDetail = await newUserDetail.save();

        return NextResponse.json(
            {
                message: "User details created successfully.",
                success: true,
                userDetail: savedUserDetail,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating user details:", error.stack);
        return NextResponse.json(
            { error: "Internal Server Error." },
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {
        const reqBody = await request.json();
        const { email, name, description, state, city, location, landmark, phone, image, rating, comment,ptype } = reqBody;

        // Validate required fields (you may want to adjust this based on your update logic)
        if (!email) {
            return NextResponse.json(
                { error: "Email is required." },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email format." },
                { status: 400 }
            );
        }

        // Check if user details exist
        const userDetail = await Userdetail.findOne({ email });
        if (!userDetail) {
            return NextResponse.json(
                { error: "User details do not exist." },
                { status: 404 }
            );
        }

        // Update fields that are provided in the request
        if (name) userDetail.name = name;
        if (description) userDetail.description = description;
        if (state) userDetail.state = state;
        if (city) userDetail.city = city;
        if (location) userDetail.location = location;
        if (landmark) userDetail.landmark = landmark;
        if (phone) userDetail.phone = phone;
        if (image) userDetail.image = image;
        if (rating) userDetail.rating = rating;
        if (comment) userDetail.comment = comment;
        if (ptype) userDetail.ptype = ptype;

        // Save the updated user details
        const updatedUserDetail = await userDetail.save();

        return NextResponse.json(
            {
                message: "User details updated successfully.",
                success: true,
                userDetail: updatedUserDetail,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating user details:", error.stack);
        return NextResponse.json(
            { error: "Internal Server Error." },
            { status: 500 }
        );
    }
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    if (!email) {
        return NextResponse.json(
            { error: "Email is required." },
            { status: 400 }
        );
    }

    try {
        const userDetail = await Userdetail.findOne({ email });
        if (!userDetail) {
            return NextResponse.json(
                { error: "User not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(userDetail, { status: 200 });
    } catch (error) {
        console.error("Error fetching user details:", error);
        return NextResponse.json(
            { error: "Internal Server Error." },
            { status: 500 }
        );
    }
}
