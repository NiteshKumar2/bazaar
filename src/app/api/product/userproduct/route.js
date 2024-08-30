import { NextResponse } from "next/server";
import { connect } from "@/models/dbConfig";
import { Userdetail } from "@/models/userdetailModel";
import { Product } from "@/models/productModel";

// Establish the database connection
connect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const { email, type, subtype, size, color, prizerange, image, gender, discount, stockstatus } = reqBody;

        // Validate required fields
        if (!email || !type) {
            return NextResponse.json(
                { error: "Email, type are required." },
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
        const user = await Userdetail.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "User does not exist." },
                { status: 404 }
            );
        }

        // Create a new product
        const newProduct = new Product({
            email,
            type,
            subtype,
            size,
            color,
            prizerange,
            image,
            gender,
            discount,
            stockstatus
        });

        // Save the product
        const savedProduct = await newProduct.save();

        return NextResponse.json(
            {
                message: "Product created successfully.",
                success: true,
                product: savedProduct,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating product:", error.stack);
        return NextResponse.json(
            { error: "Internal Server Error." },
            { status: 500 }
        );
    }
}

export async function PUT(request) {
    try {

        const { searchParams } = new URL(request.url);
        const productId = searchParams.get("id");
        const reqBody = await request.json();
        const { email, type, subtype, size, color, prizerange, image, gender, discount, stockstatus } = reqBody;

        // Validate required fields
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

        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return NextResponse.json(
                { error: "Product does not exist." },
                { status: 404 }
            );
        }

        // Update fields that are provided in the request
        if (type) product.type = type;
        if (subtype) product.subtype = subtype;
        if (size) product.size = size;
        if (color) product.color = color;
        if (prizerange) product.prizerange = prizerange;
        if (image) product.image = image;
        if (gender) product.gender = gender;
        if (discount) product.discount = discount;
        if (stockstatus) product.stockstatus = stockstatus;

        // Save the updated product
        const updatedProduct = await product.save();

        return NextResponse.json(
            {
                message: "Product updated successfully.",
                success: true,
                product: updatedProduct,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating product:", error.stack);
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
        const product = await Product.find({ email });
        if (!product) {
            return NextResponse.json(
                { error: "Product not found." },
                { status: 404 }
            );
        }
        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        console.error("Error fetching product:", error);
        return NextResponse.json(
            { error: "Internal Server Error." },
            { status: 500 }
        );
    }
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("id");

    if (!productId) {
        return NextResponse.json(
            { error: "Product ID is required." },
            { status: 400 }
        );
    }

    try {
        // Check if the product exists
        const product = await Product.findById(productId);
        if (!product) {
            return NextResponse.json(
                { error: "Product not found." },
                { status: 404 }
            );
        }

        // Delete the product
        await Product.findByIdAndDelete(productId);

        return NextResponse.json(
            {
                message: "Product deleted successfully.",
                success: true,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting product:", error.stack);
        return NextResponse.json(
            { error: "Internal Server Error." },
            { status: 500 }
        );
    }
}
