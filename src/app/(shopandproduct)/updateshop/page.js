"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react"; // Ensure correct import for session retrieval
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Divider,
  Collapse,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Link from "@mui/material/Link";

const ToggleableSection = ({ title, open, toggle, children }) => (
  <Box
    sx={{
      mb: 4,
      p: 2,
      border: "1px dashed grey",
      width: { xs: 250, sm: 300, md: 500, lg: 500 },
    }}
  >
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography variant="h6">{title}</Typography>
      <IconButton onClick={toggle}>
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>
    </Box>
    <Collapse in={open}>
      <Divider sx={{ my: 2 }} />
      {children}
    </Collapse>
  </Box>
);

export default function UpdateShop() {
  const router = useRouter();

  const [userDetail, setUserDetail] = useState({
    email: "",
    name: "",
    description: "",
    state: "",
    city: "",
    location: "",
    landmark: "",
    phone: "",
    image: "",
    rating: "",
    comment: "",
    ptype: "",
    search: ""
  });

  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [openDetails, setOpenDetails] = useState(false);

  // Function to fetch user details by email
  const fetchUserDetails = async (email) => {
    try {
      const response = await axios.get(`/api/userdetails?email=${email}`);
      setUserDetail(response.data); // Set the user details in state
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      toast.error("Error fetching user details: " + error.message);
    } finally {
      setIsFetching(false);
    }
  };

  // Use effect to fetch user details when the component mounts
  useEffect(() => {
    const fetchSessionAndUserDetails = async () => {
      const session = await getSession(); // Retrieve the session

      if (session && session.user) {
        const email = session.user.email; // Get the user's email from session
        fetchUserDetails(email);
      } else {
        toast.error("User not authenticated.");
        router.push("/"); // Redirect to login if not authenticated
      }
    };

    fetchSessionAndUserDetails();
  }, [router]); // Include router in the dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetail((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put("/api/userdetails", userDetail);
      console.log("Update success", response.data);
      toast.success("User details updated successfully!");
      router.push("/"); // Redirect to another page after updating
    } catch (error) {
      console.error("Update failed", error.message);
      toast.error("Update failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "white",
        color: "#000",
        mb: 4,
        mt: 8,
        p: 4,
        display: "flex",
        justifyContent: "space-between",
        gap: 4,
        flexDirection: { xs: "column", md: "row" },
        width: "100%",
        height: "100%",
      }}
    >
      {/* Left Container */}
      <Box sx={{ flex: 1, p: 2, marginLeft: { xs: 4, sm: 25, md: 10, lg: 50 } }}>
        <Box
          sx={{
            position: "relative",
            backgroundColor: "white",
            p: 2,
            boxShadow: "0 0 30px rgba(0, 0, 255, 0.5)",
            borderRadius: 1,
            overflow: "hidden",
            mb: 4,
            width: { xs: 200, sm: 300, md: 200, lg: 200 },
          }}
        >
          <Typography variant="h6">Create your Shop page</Typography>
          <Divider sx={{ my: 2 }} />
          <Link href="/createshop" underline="none">
            <Typography
              variant="body1"
              sx={{
                textTransform: "none",
                cursor: "pointer",
                color: "text.primary",
                mt: 2,
              }}
            >
              1. Enter your shop details
            </Typography>
          </Link>
          <Typography variant="body2" color="textSecondary">
            Shop name, address, contact no., owner details
          </Typography>
          <Typography variant="body1" sx={{ cursor: "pointer", color: "primary.main", mt: 2, }}>
            2. Update your shop details
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Establishment & cuisine type, opening hours
          </Typography>

          <Link href="/product" underline="none">
            <Typography
              variant="body1"
              sx={{
                color: "text.primary",
                textTransform: "none",
                cursor: "pointer",
                mt: 2,
              }}
            >
              3. your product details
            </Typography>
          </Link>
          <Typography variant="body2" color="textSecondary">
            Product name, address, and contact number
          </Typography>
        </Box>
      </Box>

      {/* Right Container */}
      <Box sx={{ flex: 2, p: 2, marginLeft: { xs: 4, sm: 25, md: -5, lg: -30 } }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Shop Update
        </Typography>

        {/* Shopping Details Section */}
        <ToggleableSection title="Enter your shop details" open={openDetails} toggle={() => setOpenDetails(!openDetails)}>
          {isFetching ? (
            <p>Loading user details...</p> // Loading message while fetching data
          ) : (
            <form onSubmit={handleUpdate}>
              <TextField
                label="Shop email"
                name="email"
                value={userDetail.email}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Shop name"
                name="name"
                value={userDetail.name}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Shop Description"
                name="description"
                value={userDetail.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="State"
                name="state"
                value={userDetail.state}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="City"
                name="city"
                value={userDetail.city}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Enter your shop’s locality, e.g., Sector 43, Gurgaon"
                name="location"
                value={userDetail.location}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                margin="normal"
              />
              <TextField
                label="Landmark"
                name="landmark"
                value={userDetail.landmark}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone number"
                name="phone"
                value={userDetail.phone}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Image URL"
                name="image"
                value={userDetail.image}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Rating"
                name="rating"
                value={userDetail.rating}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Comment"
                name="comment"
                value={userDetail.comment}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Type"
                name="ptype"
                value={userDetail.ptype}
                onChange={handleChange}
                fullWidth
                margin="normal"
              /><TextField
                label="search"
                name="search"
                value={userDetail.search}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <Box sx={{ display: "flex", alignItems: "center", flexDirection: { xs: "column", sm: "row" } }}>
                <Button variant="contained" type="submit" disabled={loading} sx={{ mt: { xs: 2, sm: 2 }, ml: { sm: 2 } }}>
                  {loading ? "Updating..." : "Update"}
                </Button>
                <Button variant="outlined" sx={{ ml: { sm: 2 }, mt: { xs: 2, sm: 2 } }} onClick={() => router.push('/')}>Cancel</Button>
              </Box>
            </form>
          )}
        </ToggleableSection>
      </Box>
    </Paper>
  );
}
