import React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
  CardMedia,
} from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import DirectionsIcon from "@mui/icons-material/Directions";
import ShareIcon from "@mui/icons-material/Share";
import StarIcon from "@mui/icons-material/Star";
import Link from "@mui/material/Link";

export default function Starshop({userDetail}) {
  // Common Styles
  const buttonStyles = {
    color: "black",
    width: '87%',
    fontSize: 12,
  };

  const containerStyles = {
    width: { xs: "90%", sm: "75%", md: "60%", lg: "50%" },
    marginLeft: { xs: 2, sm: 13, md: 25, lg: 50 },
  };

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "white",
        color: "#000",
        mb: 4,
        mt: 10,
        padding: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {/* Breadcrumb */}
      <Typography
        sx={{
          mb: 2,
          ...containerStyles,
          fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
          marginBottom: { xs: 0.5, sm: 1, md: 1.5 },
        }}
      >
        Home / India / {userDetail.state} / {userDetail.city}
      </Typography>

      {/* Image Section */}
      <CardMedia
        component="img"
        sx={{
          ...containerStyles,
          height: { xs: 200, sm: 250, md: 300, lg: 350 },
          borderRadius: 1,
          marginY: 2,
          transition: "transform 0.3s ease",
          "&:hover": { transform: "scale(1.05)" },
        }}
        image={userDetail.image}
        alt="Shop"
      />

      {/* Shop Info */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          ...containerStyles,
          padding: { xs: 2, sm: 3 },
          marginTop: { xs: 2, sm: 2, md: 2, lg: -5 },
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ marginY: 1 }}
        >
          <Typography
            variant="h4"
            sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
          >
            {userDetail.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                backgroundColor: "#4caf50",
                color: "white",
                borderRadius: "5px",
                padding: "2px 6px",
                display: "flex",
                alignItems: "center",
                marginLeft: { xs: 0, sm: 60, md: 60 },
              }}
            >
              <StarIcon sx={{ color: "white", mr: 0.5 }} />
              {userDetail.rating}
            </Box>
            <Typography variant="body2" sx={{ marginLeft: 1 }}>
              14.9K customer Ratings
            </Typography>
          </Box>
        </Stack>

        <Typography sx={{ marginY: 0.5 }}>
        {userDetail.description}
        </Typography>
        <Typography sx={{ marginBottom: 2, color: "rgb(185 185 185)" }}>
        {userDetail.city}, {userDetail.state}
        </Typography>

        <Typography sx={{ marginBottom: 2, color: "rgb(186 186 186)" }}>
          <span style={{ color: "rgb(244 168 131)" }}>Open now </span>
          (Mon - Fri) 9:30am - 7:30pm
        </Typography>

        {/* Buttons */}
        <Stack direction="row" spacing={0.1}>
          <Link href="/Home" sx={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              startIcon={<DirectionsIcon sx={{ color: "red" }} />}
              sx={{ ...buttonStyles }}
              aria-label="Get directions"
            >
              Direction
            </Button>
          </Link>
          <Link href="/Home" sx={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              startIcon={<BookmarkIcon sx={{ color: "red" }} />}
              sx={{ ...buttonStyles, marginLeft: -1 }}
              aria-label="Bookmark this shop"
            >
              Bookmark
            </Button>
          </Link>
          <Link href="/Home" sx={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              startIcon={<ShareIcon sx={{ color: "red" }} />}
              sx={{ ...buttonStyles, marginLeft: -1.5 }}
              aria-label="Share this shop"
            >
              Share
            </Button>
          </Link>
        </Stack>
      </Box>
    </Paper>
  );
}
