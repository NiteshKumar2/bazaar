"use client"; // Ensure the component is client-side

import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useRouter } from "next/navigation"; // Use Next.js router for navigation
import axios from "axios"; // For fetching data
import { Button } from "@mui/material";
import Link from "next/link";

export default function LandingTypeshow() {
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
    <div
      style={{
        backgroundColor: "rgb(255 251 247)",
        paddingTop: 50,
        paddingBottom: 50,
      }}
    >
      <div
        style={{
          padding: "0 16px", // Default padding
          paddingTop: "24px",
          paddingBottom: "24px",
          margin: "0 auto",
          maxWidth: "800px", // Max width for content
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: "23px", // Margin below heading
            textAlign: "center", // Centered heading
          }}
        >
          Explore options near you
        </Typography>

        <Accordion
          sx={{
            marginBottom: { xs: "12px", sm: "16px" }, // Margin below each accordion
            padding: { xs: "8px", sm: "12px" }, // Padding inside each accordion
          }}
        >
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Popular dress type near me</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <Link href={`/shopnearme?query=vintage`}>Vintage </Link>
              <Link href={`/shopnearme?query=floral`}>
                Floral Print Dresses{" "}
              </Link>
              <Link href={`/shopnearme?query=sporty`}>Sporty </Link> Casual Maxi
              Dresses Boho Chic Outfits Elegant Evening Gowns Classic Midi
              Dresses Street Style Fashion Comfortable Loungewear Party Cocktail
              Dresses Retro Dresses Athleisure Wear
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{
            marginBottom: { xs: "12px", sm: "16px" }, // Margin below each accordion
            padding: { xs: "8px", sm: "12px" }, // Padding inside each accordion
          }}
        >
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Popular shop near me</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Fashion Boutique Trendy Threads Style Hub Urban Outfitters Chic
              Avenue Designer Haven Luxury Attire Vintage Vault Boutique Bliss
              Urban Chic
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{
            marginBottom: { xs: "12px", sm: "16px" }, // Margin below each accordion
            padding: { xs: "8px", sm: "12px" }, // Padding inside each accordion
          }}
        >
          <AccordionSummary
            expandIcon={<ArrowDropDownIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Cities we show</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {cityData.map((data, index) => (
                <Button
                  key={index} // Ensure each Button has a unique key
                  variant="text"
                  onClick={() => handleCityClick(data)} // Handle city click
                >
                  <Typography style={{ color: "#646868" }}>{data}</Typography>
                </Button>
              ))}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
}
