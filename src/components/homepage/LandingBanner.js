'use client'
import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Button, Box, Autocomplete, InputBase, TextField } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";

function LandingBanner() {
  const top100Location = [
    { city: "jind", state: "haryana" },
    { city: "rohtak", state: "haryana" },
    { city: "panipat", state: "haryana" },
    { city: "sonipat", state: "haryana" },
    { city: "karnal", state: "haryana" },
  ];

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "grey.800",
        color: "#fff",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url(${"/shopping1.png"})`,
        margin: 0,
        padding: 0,
        borderRadius: 0,
        height: 570, // Medium height
      }}
    >
      {<img style={{ display: "none" }} src={"/shopping1.png"} alt={"image"} />}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: "rgba(0,0,0,.3)",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          textAlign: "center",
          padding: 0,
          margin: 0,
        }}
      >
        <Typography
          component="h1"
          variant="h3"
          color="inherit"
          gutterBottom
          sx={{
            fontSize: {
              xs: "2rem",
              sm: "2.5rem",
              md: "3rem",
              lg: "3.5rem",
            },
            
            margin: 0,
            padding: 0,
          }}
        >
          Bigbazar
        </Typography>

        <Typography
          variant="h5"
          color="inherit"
          paragraph
          sx={{
            fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" },
            margin: 2.5,
            padding: 0,
            color:"white"
          }}
        >
          Big Bazaar offers a variety of dresses near you, ensuring you find the perfect style for any occasion
        </Typography>
        

            <Paper
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                maxWidth: { xs: 250, sm: 450, md: 450 },
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1, }}
                placeholder="Search"
                inputProps={{ "aria-label": "Search" }}
              />
              <Button type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </Button>
            </Paper>
        

        </Box>
      
    </Paper>
  );
}

export default LandingBanner;
