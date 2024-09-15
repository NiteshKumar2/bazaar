"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';  // Importing toast for notifications
import FilterSection from '@/components/mainpage/FilterSection';
import MainCard from '@/components/mainpage/MainCard';
import LandingTypeshow from '@/components/homepage/LandingTypeshow';
import CarouselSection from '@/components/mainpage/CarouselSection';

const shopenearme = ({ searchParams }) => {
  const [userDetail, setUserDetail] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const location = searchParams.location;
  const gender = searchParams.gender;
  const query = searchParams.query;

  // Fetch user details by location when the component mounts or when location changes
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (location) {
        setIsFetching(true); // Set fetching state to true
        try {
          const response = await axios.get(`/api/search/location?location=${location}`);
          setUserDetail(response.data.data || []); // Set the user details in state, ensuring it's an array
          toast.success(`Fetched user details for location: ${location}`);
        } catch (error) {
          console.error("Error fetching user details:", error.message);
          toast.error("Error fetching user details: " + error.message);
        } finally {
          setIsFetching(false); // Set fetching state to false after the request
        }
      }
      if(gender){
        setIsFetching(true); // Set fetching state to true
        try {
          const response = await axios.get(`/api/search/usertype?gender=${gender}`);
          setUserDetail(response.data.data || []); // Set the user details in state, ensuring it's an array
          toast.success(`Fetched user details for location: ${gender}`);
        } catch (error) {
          console.error("Error fetching user details:", error.message);
          toast.error("Error fetching user details: " + error.message);
        } finally {
          setIsFetching(false); // Set fetching state to false after the request
        }
      }
      if(query){
        setIsFetching(true); // Set fetching state to true
        try {
          const response = await axios.get(`/api/search/searchquery?query=${query}`);
          setUserDetail(response.data.data || []); // Set the user details in state, ensuring it's an array
          toast.success(`Fetched user details for location: ${gender}`);
        } catch (error) {
          console.error("Error fetching user details:", error.message);
          toast.error("Error fetching user details: " + error.message);
        } finally {
          setIsFetching(false); // Set fetching state to false after the request
        }
      }
    };

    fetchUserDetails(); // Call the function
  }, [location,gender,query]); // Dependency array to run effect when location changes

  return (
    <>
      {isFetching && <p>Loading user details...</p>} {/* Show loading message */}
      <FilterSection location={location} />
      <CarouselSection />
      <MainCard userDetail={userDetail} />
      <LandingTypeshow />


    </>
  );
};

export default shopenearme;
