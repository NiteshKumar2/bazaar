"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  Button,
  Box,
  Autocomplete,
  InputBase,
  TextField,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

function LandingBanner() {
  const router = useRouter();
  const [isFetching, setIsFetching] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const handleQuerySearch = (event) => {
    event.preventDefault();
    if (query) {
      toast.success(`Selected query: ${query}`);
      router.push(`/shopnearme?query=${query}`);
      setQuery(""); // Clear query after search
    } else {
      toast.error("Please enter a query.");
    }
  };

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
        height: {
          xs: 480,
          sm: 570,
          md: 690,
          lg: 690,
        }, // Medium height
      }}
    >
      {
        <Image
          src="/shopping1.png" // Ensure the image path is correct
          alt="image"
          width={100} // You need to specify a width (change as needed)
          height={100} // Specify a height (change as needed)
          style={{ display: "none" }} // Maintain the display: "none" style
        />
      }
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
            color: "white",
          }}
        >
          Big Bazaar offers a variety of dresses near you, ensuring you find the
          perfect style for any occasion
        </Typography>

        <Paper
          component="form"
          onSubmit={handleQuerySearch}
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            maxWidth: { xs: 250, sm: 450, md: 450 },
          }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ "aria-label": "Search" }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button
            type="submit"
            sx={{ p: "10px" }}
            aria-label="search"
            disabled={isFetching || !query}
          >
            {isFetching ? <CircularProgress size={24} /> : <SearchIcon />}
          </Button>
        </Paper>
      </Box>
    </Paper>
  );
}

export default LandingBanner;
