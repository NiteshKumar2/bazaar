"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react"; // Use the correct method to get session client-side

export default function UpdateUserDetails() {
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
        comment: ""
    });
    
    const [loading, setLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    // Function to fetch user details by email
    const fetchUserDetails = async (email) => {
        try {
            const response = await axios.get(`/api/userdetails?email=${email}`);
            setUserDetail(response.data); // Set the user details in state
        } catch (error) {
            console.error("Error fetching user details:", error.message);
            toast.error("Error fetching user details: " + error.message);
        } finally {
            setIsFetching(false);
        }
    };

    // Use effect to fetch user details when the component mounts
    useEffect(() => {
        const fetchSessionAndUserDetails = async () => {
            const session = await getSession(); // Retrieve the session

            if (session && session.user) {
                const email = session.user.email; // Get the user's email from session
                fetchUserDetails(email);
            } else {
                toast.error("User not authenticated.");
                router.push("/login"); // Redirect to login if not authenticated
            }
        };

        fetchSessionAndUserDetails();
    }, [router]); // Include router in the dependency array

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetail((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.put("/api/userdetails", userDetail);
            console.log("Update success", response.data);
            toast.success("User details updated successfully!");
            router.push("/"); // Redirect to another page after updating
        } catch (error) {
            console.error("Update failed", error.message);
            toast.error("Update failed: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Updating..." : "Update User Details"}</h1>
            {isFetching ? (
                <p>Loading user details...</p> // Loading message while fetching data
            ) : (
                <form onSubmit={handleUpdate} className="flex flex-col">
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
                    <button
                        type="submit"
                        disabled={loading}
                        className="p-2 border border-gray-300 rounded-lg mb-4"
                    >
                        {loading ? "Updating..." : "Update"}
                    </button>
                </form>
            )}
        </div>
    );
}
