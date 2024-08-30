"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onSignup = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            setLoading(true);
            const response = await axios.post("/api/auth/signup", user);
            console.log("Signup success", response.data);
            router.push("/auth/verification"); // Ensure the correct path for verification
        } catch (error) {
            console.log("Signup failed", error.message);
            toast.error(error.response?.data?.error || error.message); // Display specific error message
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Enable button only if all fields are filled
        setButtonDisabled(!(user.email && user.password && user.username));
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing..." : "Signup"}</h1>
            <hr />
            <form onSubmit={onSignup} className="w-full max-w-sm">
                <label htmlFor="username">Username</label>
                <input
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Username"
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    required
                />
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Password"
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    required
                />
                <button
                    type="submit"
                    disabled={buttonDisabled || loading}
                    className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? "Signing Up..." : "Signup"}
                </button>
            </form>
            <button
                onClick={() => signIn('google')}
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
                Signup with Google
            </button>
            <Link href="/login" className="text-blue-500 hover:underline">Visit Login Page</Link>
        </div>
    );
}
