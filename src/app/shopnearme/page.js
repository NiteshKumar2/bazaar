"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast"; // Importing toast for notifications
import FilterSection from "@/components/mainpage/FilterSection";
import MainCard from "@/components/mainpage/MainCard";
import LandingTypeshow from "@/components/homepage/LandingTypeshow";
import CarouselSection from "@/components/mainpage/CarouselSection";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress"; // Importing LinearProgress for loading indicator

const shopnearme = ({ searchParams }) => {
  const [userDetail, setUserDetail] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const { location, gender, query } = searchParams;

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsFetching(true); // Set fetching state to true

      try {
        let response;

        if (location) {
          response = await axios.get(
            `/api/search/location?location=${location}`
          );
          toast.success(`Fetched user details for location: ${location}`);
        } else if (gender) {
          response = await axios.get(`/api/search/usertype?gender=${gender}`);
          toast.success(`Fetched user details for gender: ${gender}`);
        } else if (query) {
          response = await axios.get(`/api/search/searchquery?query=${query}`);
          toast.success(`Fetched user details for query: ${query}`);
        }

        setUserDetail(response?.data?.data || []); // Set the user details in state
      } catch (error) {
        console.error("Error fetching user details:", error.message);
        toast.error("Error fetching user details: " + error.message);
      } finally {
        setIsFetching(false); // Set fetching state to false after the request
      }
    };

    fetchUserDetails(); // Call the function
  }, [location, gender, query]); // Dependency array to run effect when location, gender, or query changes

  return (
    <>
      {/* Show loading indicator when fetching data */}
      {isFetching && (
        <Box sx={{ width: "100%", marginBottom: 12 }}>
          <LinearProgress />
        </Box>
      )}
      {/* Render sections */}
      <FilterSection location={location} />
      <CarouselSection />
      <MainCard userDetail={userDetail} isFetching={isFetching} />
      <LandingTypeshow />
    </>
  );
};

export default shopnearme;
