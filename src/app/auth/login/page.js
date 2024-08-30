"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission
        try {
            setLoading(true);
            
            const result = await signIn("credentials", {
                email: user.email,
                password: user.password,
                callbackUrl: "/",
                redirect: false, // Change to false to handle response manually
            });

            if (result.error) {
                toast.error(result.error); // Display the error message
            } else {
                toast.success("Login success");
                router.push(result.url); // Redirect to the callback URL
            }
        } catch (error) {
            console.log("Login failed", error.message);
            toast.error("An error occurred while logging in."); // Generic error message
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisabled(!(user.email && user.password)); // Enable button only if both fields are filled
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr />
            <form onSubmit={onLogin} className="w-full max-w-sm">
                <label htmlFor="email">Email</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                />
                <label htmlFor="password">Password</label>
                <input
                    className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Password"
                />
                <button
                    type="submit"
                    disabled={buttonDisabled || loading} // Disable button while loading or if fields are empty
                    className={`p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 ${buttonDisabled || loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? "Logging in..." : "Login Here"}
                </button>
            </form>
            <Link href="/signup">Visit Signup Page</Link>
        </div>
    );
}
