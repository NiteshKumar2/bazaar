"use client"
import Overview from "@/components/productpage/Overview";
import Starshop from "@/components/productpage/Starshop";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';  // Importing toast for notifications

export default function Page({ searchParams }) {
  const [userDetail, setUserDetail] = useState([]);
  const [productDetail, setProductDetail] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const email = searchParams.email;
  useEffect(() => {
    const fetchUserDetails = async () => {
    
        setIsFetching(true); // Set fetching state to true
        try {
          const response = await axios.get(`/api/userdetails?email=${email}`);
          setUserDetail(response.data|| []); // Set the user details in state, ensuring it's an array
          toast.success(`Fetched user details for location: ${email}`);
        } catch (error) {
          console.error("Error fetching user details:", error.message);
          toast.error("Error fetching user details: " + error.message);
        } finally {
          setIsFetching(false); // Set fetching state to false after the request
        }
      
      
      }
    fetchUserDetails(); // Call the function
  }, [email]);
  
  useEffect(() => {
    const fetchProductDetails = async () => {
    
        setIsFetching(true); // Set fetching state to true
        try {
          const response = await axios.get(`/api/product/userproduct?email=${email}`);
          setProductDetail(response.data|| []); // Set the user details in state, ensuring it's an array
          toast.success(`Fetched user details for location: ${email}`);
        } catch (error) {
          console.error("Error fetching user details:", error.message);
          toast.error("Error fetching user details: " + error.message);
        } finally {
          setIsFetching(false); // Set fetching state to false after the request
        }
      
      
      }
    fetchProductDetails(); // Call the function
  }, [email]);// Dependency array to run effect when location changes

  return (
    <>
      {isFetching && <p style={{marginTop:20}}>Loading user details...</p>}
      <Starshop userDetail={userDetail} productDetail={productDetail}/>
      <Overview  userDetail={userDetail} productDetail={productDetail}/>
    </>
  );
}
