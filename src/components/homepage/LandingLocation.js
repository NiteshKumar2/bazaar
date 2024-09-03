"use client"; // Ensure this is at the top

import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { KeyboardArrowRight } from "@mui/icons-material";

function LandingLocation() {
  const buttonData = [
    { city: "jind", state: "423 " },
    { city: "panipat", state: "443 " },
    { city: "karnal", state: "432 " },
    { city: "sonipat", state: "4321 " },
    { city: "jind", state: "434 " },
    { city: "Locality", state: "4634" },

  ];

  return (
    <Box
      sx={{
        paddingX: { xs: 3, sm: 55, md: 55 }, // Padding on the x-axis included for all screen sizes
        paddingY: { xs: 3, sm: 9, md: 11 }, // Vertical padding based on screen size
        marginTop: 6, // Top margin
        backgroundColor:"rgb(248 248 248)"
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
        {buttonData.map((data, index) => (
          <Box
            key={index}
            sx={{
              flex: {
                xs: "1 1 100%", // 1 item per row in phone mode
                sm: "1 1 calc(50% - 8px)", // 2 items per row in window mode
              },
              maxWidth: {
                xs: "100%", // 100% width in phone mode
                sm: "calc(50% - 8px)", // 50% width in window mode
              },
              marginBottom: 1, // Reduced bottom margin to decrease vertical gap
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              variant="contained"
              endIcon={<KeyboardArrowRight />}
              sx={{
                backgroundColor: "white",
                color: "black",
                padding: "12px", // Reduced padding for a more compact look
                width: "100%",
                "&:hover": { backgroundColor: "#f0f0f0" },
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "0.9rem", // Reduced font size for a compact appearance
              }}
            >
              <Box
                sx={{
                  flexGrow: 1,
                  textAlign: "left",
                }}
              >
                {data.city}
                <br />
                {data.state}
              </Box>
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default LandingLocation;
