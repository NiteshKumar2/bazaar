"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CreateUserDetails() {
    const router = useRouter();
    const [userDetail, setUserDetail] = useState({
        email: "",
        name: "",
        description: "",
        state: "",
        city: "",
        location: "",
        landmark: "",
        phone: "",
        image: "",
        rating: "",
        comment:"",
        ptype:""
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetail((prev) => ({ ...prev, [name]: value }));
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post("/api/userdetails", userDetail);
            console.log("Create success", response.data);
            toast.success("User details created successfully!");
            router.push("/"); // Redirect to another page after creating
        } catch (error) {
            console.error("Create failed", error.message);
            toast.error("Create failed: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Creating..." : "Create User Details"}</h1>
            <form onSubmit={handleCreate} className="flex flex-col">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    value={userDetail.email}
                    onChange={handleChange}
                    required
                    className="p-2 border border-gray-300 rounded-lg mb-4"
                />
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={userDetail.name}
                    onChange={handleChange}
                    required
                    className="p-2 border border-gray-300 rounded-lg mb-4"
                />
                <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        name="description"
                        value={userDetail.description}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-lg mb-4"
                    />
                    <label htmlFor="state">State:</label>
                    <input
                        type="text"
                        name="state"
                        value={userDetail.state}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-lg mb-4"
                    />
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        name="city"
                        value={userDetail.city}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-lg mb-4"
                    />
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={userDetail.location}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-lg mb-4"
                    />
                    <label htmlFor="landmark">Landmark:</label>
                    <input
                        type="text"
                        name="landmark"
                        value={userDetail.landmark}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-lg mb-4"
                    />
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="text"
                        name="phone"
                        value={userDetail.phone}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-lg mb-4"
                    />
                    <label htmlFor="image">Image URL:</label>
                    <input
                        type="text"
                        name="image"
                        value={userDetail.image}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-lg mb-4"
                    />
                    <label htmlFor="rating">Rating:</label>
                    <input
                        type="text"
                        name="rating"
                        value={userDetail.rating}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-lg mb-4"
                    />
                    <label htmlFor="comment">Comment:</label>
                    <input
                        type="text"
                        name="comment"
                        value={userDetail.comment}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-lg mb-4"
                    />
                    
                    <label htmlFor="ptype">Type:</label>
                    <input
                        type="text"
                        name="ptype"
                        value={userDetail.ptype}
                        onChange={handleChange}
                        className="p-2 border border-gray-300 rounded-lg mb-4"
                    />

                {/* Add other input fields similarly */}
                <button
                    type="submit"
                    disabled={loading}
                    className="p-2 border border-gray-300 rounded-lg mb-4"
                >
                    {loading ? "Creating..." : "Create"}
                </button>
            </form>
        </div>
    );
}
