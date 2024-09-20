"use client"; // Ensure the component is client-side

import React, { useState, useEffect } from "react";
import { Button, Box, Typography } from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";
import { useRouter } from "next/navigation"; // Use Next.js router for navigation
import axios from "axios"; // For fetching data

function LandingLocation() {
  const [cityData, setCityData] = useState([]);
  const router = useRouter();

  // Fetch city data from the API
  useEffect(() => {
    const fetchCityData = async () => {
      try {
        const response = await axios.get("/api/search/city");
        if (response.data.success) {
          setCityData(response.data.data || []);
        } else {
          console.error("Failed to fetch cities.");
        }
      } catch (error) {
        console.error("Error fetching city data:", error);
      }
    };

    fetchCityData();
  }, []);

  // Handle city button click to navigate to the next page
  const handleCityClick = (city) => {
    router.push(`/shopnearme?location=${city}`);
  };

  return (
    <Box
      sx={{
        paddingX: { xs: 3, sm: 55, md: 55 }, // Padding on the x-axis for all screen sizes
        paddingY: { xs: 15, sm: 15, md: 15 }, // Vertical padding
        marginTop: 6,
        backgroundColor: "rgb(248 248 248)",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          marginBottom: 3,
        }}
      >
        Near localities in your area
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 1,
        }}
      >
        {cityData.map((data, index) => (
          <Box
            key={index}
            sx={{
              flex: {
                xs: "1 1 100%", // 1 item per row in phone mode
                sm: "1 1 calc(50% - 8px)", // 2 items per row in larger screens
              },
              maxWidth: {
                xs: "100%", // Full width in phone mode
                sm: "calc(50% - 8px)", // Half width in larger screens
              },
              marginBottom: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              endIcon={<KeyboardArrowRight />}
              onClick={() => handleCityClick(data)} // Handle city click
              sx={{
                backgroundColor: "white",
                color: "black",
                padding: "12px", // Reduced padding for a compact look
                width: "100%",
                "&:hover": { backgroundColor: "#f0f0f0" },
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "0.9rem", // Compact font size
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  textAlign: "left",
                }}
              >
                {data}
                <br />
                {"22"}
              </Box>
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default LandingLocation;
