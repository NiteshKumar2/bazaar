"use client";
import * as React from "react";
import { useState } from "react";

import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Container from "@mui/material/Container";
import { makeStyles } from "@mui/styles";
import Rating from "@mui/material/Rating";
import {
  Box,
  Typography,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";

import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ProductCard from "./ProductCard";

function Overview({ productDetail, userDetail }) {
  // Set default state so that product details are displayed initially
  const [showAbout, setShowAbout] = useState(true);
  const [productClicked, setProductClicked] = useState(true);
  const [overviewClicked, setOverviewClicked] = useState(false);
  const [reviewsClicked, setReviewsClicked] = useState(false);

  const handleProductClick = () => {
    setShowAbout(true);
    setProductClicked(true);
    setOverviewClicked(false);
    setReviewsClicked(false);
  };

  const handleOverviewClick = () => {
    setShowAbout(true);
    setOverviewClicked(true);
    setProductClicked(false);
    setReviewsClicked(false);
  };

  const handleReviewClick = () => {
    setShowAbout(true);
    setReviewsClicked(true);
    setProductClicked(false);
    setOverviewClicked(false);
  };

  const ReviewComponent = () => {
    const [anchorElSort, setAnchorElSort] = React.useState(null);
    const [anchorElFilter, setAnchorElFilter] = React.useState(null);

    const handleSortMenuClick = (event) => setAnchorElSort(event.currentTarget);
    const handleSortMenuClose = () => setAnchorElSort(null);

    const handleFilterMenuClick = (event) =>
      setAnchorElFilter(event.currentTarget);
    const handleFilterMenuClose = () => setAnchorElFilter(null);

    return (
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "white",
          padding: "1px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "-37px",
          fontSize: "1.6rem",
          fontWeight: "bold",
        }}
      >
        <Stack
          direction="row"
          spacing={4}
          sx={{
            width: { xs: "80%", sm: "52%", md: "52%" },
            justifyContent: "left",
            marginBottom: 0.3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              cursor: "pointer",
              color: productClicked ? "red" : "inherit",
            }}
            onClick={handleProductClick}
          >
            Product
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              cursor: "pointer",
              color: overviewClicked ? "red" : "inherit",
            }}
            onClick={handleOverviewClick}
          >
            Overview
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              cursor: "pointer",
              color: reviewsClicked ? "red" : "inherit",
            }}
            onClick={handleReviewClick}
          >
            Reviews
          </Typography>
        </Stack>

        <Divider
          variant="middle"
          sx={{
            width: { xs: "80%", sm: "55%", md: "55%" },
            marginY: 2,
            backgroundColor:
              productClicked || overviewClicked || reviewsClicked
                ? "rgb(185 185 185)"
                : "inherit",
          }}
        />

        {showAbout && (
          <Container
            sx={{ alignItems: "center", marginLeft: { xs: 3, sm: 54, md: 54 } }}
          >
            <Box sx={{ width: "80%", marginTop: 2 }}>
              {overviewClicked && (
                <>
                  <Typography variant="h5" sx={{ marginBottom: 2 }}>
                    About this shop
                  </Typography>
                  <Box>
                    <Typography variant="h5" sx={{ marginBottom: 2 }}>
                      Types of Dress
                    </Typography>
                    <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
                      <Button variant="outlined">{userDetail.ptype[0]}</Button>
                      <Button variant="outlined">{userDetail.ptype[1]}</Button>
                      <Button variant="outlined">{userDetail.ptype[2]}</Button>
                    </Stack>
                  </Box>

                  <Box>
                    <Typography variant="h5" sx={{ marginBottom: 2 }}>
                      location
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: 2 }}>
                      {userDetail.location}, near: {userDetail.landmark}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="h5" sx={{ marginBottom: 2 }}>
                      Phone No.
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: 7 }}>
                      {userDetail.phone}
                    </Typography>
                  </Box>
                </>
              )}

              {productClicked && (
                <>
                  <Typography
                    variant="h5"
                    sx={{
                      marginBottom: 4,
                    }}
                  >
                    Product Details
                  </Typography>
                  <ProductCard productDetail={productDetail} />
                </>
              )}

              {reviewsClicked && (
                <>
                  <Typography variant="h5" sx={{ marginBottom: 2 }}>
                    Customer Reviews
                  </Typography>
                  <Box>
                    <Stack direction="row" alignItems="center">
                      <Button
                        endIcon={<ArrowDropDownIcon />}
                        onClick={handleSortMenuClick}
                        color="rgb(185 185 185)"
                      >
                        Relevance
                      </Button>
                      <Menu
                        anchorEl={anchorElSort}
                        open={Boolean(anchorElSort)}
                        onClose={handleSortMenuClose}
                      >
                        <MenuItem onClick={handleSortMenuClose}>
                          Most Recent
                        </MenuItem>
                        <MenuItem onClick={handleSortMenuClose}>
                          Most Helpful
                        </MenuItem>
                      </Menu>

                      <Button
                        sx={{ marginLeft: { xs: 0, sm: 65, md: 65 } }}
                        endIcon={<ArrowDropDownIcon />}
                        onClick={handleFilterMenuClick}
                        color="rgb(185 185 185)"
                      >
                        All Ratings
                      </Button>
                      <Menu
                        anchorEl={anchorElFilter}
                        open={Boolean(anchorElFilter)}
                        onClose={handleFilterMenuClose}
                      >
                        <MenuItem onClick={handleFilterMenuClose}>
                          5 Stars
                        </MenuItem>
                        <MenuItem onClick={handleFilterMenuClose}>
                          4 Stars
                        </MenuItem>
                      </Menu>
                    </Stack>
                  </Box>

                  {/* Reviews */}
                  <Box sx={{ padding: 2 }}>
                    {[1].map((review, index) => (
                      <Box key={index} sx={{ paddingBottom: 4 }}>
                        <Stack
                          direction="row"
                          spacing={2}
                          sx={{ alignItems: "center" }}
                        >
                          <Avatar
                            alt="User Name"
                            src="https://via.placeholder.com/150"
                          />
                          <Typography variant="h6">User </Typography>
                        </Stack>

                        <Box sx={{ marginY: 1 }}>
                          <Rating name="rating" value={4} readOnly />
                        </Box>

                        <Typography variant="body1" sx={{ marginBottom: 2 }}>
                          {userDetail.comment}
                        </Typography>

                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ justifyContent: "flex-start" }}
                        >
                          <IconButton size="small">
                            <CommentIcon />
                          </IconButton>
                          <IconButton size="small">
                            <ShareIcon />
                          </IconButton>
                        </Stack>

                        <Divider
                          variant="middle"
                          sx={{
                            marginY: 1,
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                </>
              )}
            </Box>
          </Container>
        )}
      </Paper>
    );
  };

  return <ReviewComponent />;
}

export default Overview;
