"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Link,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import useMediaQuery from "@mui/material/useMediaQuery";

const items = [
  { id: 1, title: "Vintage ", img: "shopping1.png", link: `/shopnearme?query=vintage` },
  { id: 2, title: "Floral Print Dresses", img: "shopping1.png", link: `/shopnearme?query=floral` },
  { id: 3, title: "Cake", img: "shopping1.png", link: "#" },
  { id: 4, title: "Chole Bhature", img: "shopping1.png", link: "#" },
  { id: 5, title: "Thali", img: "shopping1.png", link: "#" },
  { id: 6, title: "Biryani", img: "shopping1.png", link: "#" },
  { id: 7, title: "Paratha", img: "shopping1.png", link: "#" },
];

const CarouselSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isPhone = useMediaQuery("(max-width:600px)");

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
    <Typography
          variant="h5"
          sx={{ // Margin below heading
            textAlign: "Left",
            marginLeft: { xs: 3, sm: 50, md: 50 },
            marginTop: { xs: 3, sm: 7, md: 7 } // Centered heading
          }}
        >
          Top Queries
        </Typography>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        py: 2,
        mx: {
          xs: 10,
          sm: 50,
          md: 50,
        },
      }}
    >
      
      <IconButton
        onClick={handlePrev}
        sx={{
          position: "absolute",
          left: {
            xs: -30,
            sm: -30,
            md: -30,
          },
        }}
      >
        <ArrowBackIos />
      </IconButton>

      <Box
        sx={{
          display: "flex",
          overflow: "hidden",
          width: isPhone ? "89%" : "88%",
          justifyContent: isPhone ? "space-between" : "space-between",
        }}
      >
        {items.map((item, index) => (
          <Link href={item.link} underline="none" key={item.id}>
            <Box
              sx={{
                transform: `translateX(-${currentIndex * (isPhone ? 100 : 100)
                  }%)`,
                transition: "transform 0.3s ease-in-out",
                minWidth: isPhone ? "100%" : "20%",
                boxSizing: "border-box",
                display: "flex",
                justifyContent: "center",
                p: 2,
              }}
            >
              <Card
                sx={{
                  width: {
                    xs: 160,
                    sm: 210,
                    md: 210,
                  },
                  height: {
                    xs: 190,
                    sm: 250,
                    md: 250,
                  },
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#dbdfe0",
                  boxShadow: "none", // Remove shadow here
                }}
              >
                <Box
                  component="img"
                  src={item.img}
                  alt={item.title}
                  sx={{ width: "100%", height: "100%", borderRadius: "50%" }}
                />
                <CardContent sx={{ textAlign: "center", p: 1 }}>
                  <Typography variant="h6" sx={{ fontSize: 14 }}>
                    {item.title}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Link>
        ))}
      </Box>

      <IconButton
        onClick={handleNext}
        sx={{
          position: "absolute",
          right: {
            xs: -30,
            sm: -30,
            md: -30,
          },
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
    </>
  );
};

export default CarouselSection;
