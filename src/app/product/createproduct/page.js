"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { getSession } from "next-auth/react"; // Import the getSession function

export default function CreateProduct() {
    const [formData, setFormData] = useState({
        email: '',
        type: '',
        subtype: '',
        size: '',
        color: '',
        prizerange: '',
        image: '',
        gender: '',
        discount: '',
        stockstatus: ''
    });

    const [loading, setLoading] = useState(true);

    // Fetch the email from the session
    useEffect(() => {
        const fetchSessionEmail = async () => {
            const session = await getSession();
            if (session && session.user) {
                setFormData((prev) => ({
                    ...prev,
                    email: session.user.email // Set email from session
                }));
            } else {
                toast.error("User not authenticated.");
                // Handle redirection or further actions if needed
            }
            setLoading(false); // Set loading to false after fetching
        };

        fetchSessionEmail();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/product/userproduct', formData);
            toast.success(response.data.message);
            // Optionally reset form or redirect after successful creation
        } catch (error) {
            toast.error(error.response?.data?.error || 'An error occurred while creating the product.');
        }
    };

    return (
        <div>
            <h2>Create Product</h2>
            {loading ? (
                <p>Loading...</p> // Loading message while fetching email
            ) : (
                <form onSubmit={handleSubmit}>
                    <input
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        readOnly // Make email read-only
                        required
                    />
                    <input
                        name="type"
                        placeholder="Type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="subtype"
                        placeholder="Subtype"
                        value={formData.subtype}
                        onChange={handleChange}
                    />
                    <input
                        name="size"
                        placeholder="Size"
                        value={formData.size}
                        onChange={handleChange}
                    />
                    <input
                        name="color"
                        placeholder="Color"
                        value={formData.color}
                        onChange={handleChange}
                    />
                    <input
                        name="prizerange"
                        placeholder="Price Range"
                        type="number"
                        value={formData.prizerange}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="image"
                        placeholder="Image URL"
                        value={formData.image}
                        onChange={handleChange}
                    />
                    <input
                        name="gender"
                        placeholder="Gender"
                        value={formData.gender}
                        onChange={handleChange}
                    />
                    <input
                        name="discount"
                        placeholder="Discount"
                        type="number"
                        value={formData.discount}
                        onChange={handleChange}
                    />
                    <input
                        name="stockstatus"
                        placeholder="Stock Status"
                        value={formData.stockstatus}
                        onChange={handleChange}
                    />
                    <button type="submit">Create Product</button>
                </form>
            )}
        </div>
    );
}
