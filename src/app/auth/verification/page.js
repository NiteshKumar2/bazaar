"use client";
import React, { useState,useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";




export default function SignupPage() {
    const router = useRouter();
    const [tokenvalue, setTokenvalue] = useState({
        email: "",
        token: "",
    })
    const [buttonDisabled, setButtonDisabled] =useState(false);
    const [loading, setLoading] = useState(false);

    const onVerify = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/auth/verifyemail", tokenvalue);
            console.log("Signup success", response.data);
            router.push("/auth/login");
            
        } catch (error) {
            console.log("verification failed", error.message);
            
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(tokenvalue.email.length > 0 && tokenvalue.token.length > 0 ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [tokenvalue]);


    return (
    <div >
        <h1>{loading ? "Processing" : "Signup"}</h1>
        <hr />
        <label htmlFor="email">email</label>
        <input 
            id="email"
            type="text"
            value={tokenvalue.email}
            onChange={(e) => setTokenvalue({...tokenvalue, email: e.target.value})}
            placeholder="email"
            />
        <label htmlFor="token">token</label>
        <input 
            id="token"
            type="text"
            value={tokenvalue.token}
            onChange={(e) => setTokenvalue({...tokenvalue, token: e.target.value})}
            placeholder="token"
            />
            <button
            onClick={onVerify}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "No Verification" : "Verification"}</button>
        </div>
    )

}