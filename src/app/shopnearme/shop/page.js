"use client";
import Overview from "@/components/productpage/Overview";
import Starshop from "@/components/productpage/Starshop";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; // Importing toast for notifications
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress"; // Importing LinearProgress for progress bar

export default function Page({ searchParams }) {
  const [userDetail, setUserDetail] = useState([]);
  const [productDetail, setProductDetail] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const email = searchParams.email;

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsFetching(true);
      try {
        const response = await axios.get(`/api/userdetails?email=${email}`);
        setUserDetail(response.data || []); // Ensure response is an array
        toast.success(`Fetched user details for location: ${email}`);
      } catch (error) {
        console.error("Error fetching user details:", error.message);
        toast.error("Error fetching user details: " + error.message);
      } finally {
        setIsFetching(false);
      }
    };
    fetchUserDetails();
  }, [email]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsFetching(true);
      try {
        const response = await axios.get(
          `/api/product/userproduct?email=${email}`
        );
        setProductDetail(response.data || []); // Ensure response is an array
        toast.success(`Fetched product details for location: ${email}`);
      } catch (error) {
        console.error("Error fetching product details:", error.message);
        toast.error("Error fetching product details: " + error.message);
      } finally {
        setIsFetching(false);
      }
    };
    fetchProductDetails();
  }, [email]);

  return (
    <>
      {/* Show LinearProgress when data is being fetched */}
      {isFetching ? (
        <Box sx={{ width: "100%", marginTop: 8 }}>
          <LinearProgress />
        </Box>
      ) : (
        <>
          <Starshop userDetail={userDetail} productDetail={productDetail} />
          <Overview userDetail={userDetail} productDetail={productDetail} />
        </>
      )}
    </>
  );
}
