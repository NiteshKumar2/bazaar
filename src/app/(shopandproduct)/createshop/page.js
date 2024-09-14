"use client";
import React, { useState, useEffect } from "react";
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
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getSession } from "next-auth/react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function CreateShop() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [shopDetails, setShopDetails] = useState({
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
    search: "",
  });

  const [openSections, setOpenSections] = useState({
    details: false,
  });

  const fetchUserDetails = async (email) => {
    try {
      const response = await axios.get(`/api/userdetails?email=${email}`);
      router.push("/updateshop")// Set the user details in state
    } catch (error) {
      console.error("Error fetching user details:", error.message);
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
        router.push("/login"); // Redirect to login if not authenticated
      }
    };

    fetchSessionAndUserDetails();
  }, [router]); // Include router in the dependency array

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShopDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateFields = () => {
    const { name, description, phone, image, rating } = shopDetails;
    if (!name || !description || !phone || !image || !rating) {
      toast.error("Please fill in all the required fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setLoading(true);
    try {
      const response = await axios.post("/api/userdetails", shopDetails);
      toast.success("Shop details created successfully!");
      router.push("/updateshop"); // Navigate to a success page
    } catch (error) {
      toast.error("Failed to create shop details: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderTextField = (label, name, type = "text", props) => (
    <Box sx={{ mt: 2 }}>
      <TextField
        label={label}
        name={name}
        type={type}
        value={shopDetails[name]}
        onChange={handleChange}
        fullWidth
        margin="normal"
        {...props}
      />
    </Box>
  );

  const renderSection = (title, sectionKey, children) => (
    <Box sx={{ mb: 4, p: 2, border: "1px dashed grey", width: { xs: 250, sm: 300, md: 500, lg: 500 } }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h6">{title}</Typography>
        <IconButton onClick={() => toggleSection(sectionKey)}>
          {openSections[sectionKey] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <Collapse in={openSections[sectionKey]}>
        <Divider sx={{ my: 2 }} />
        {children}
      </Collapse>
    </Box>
  );

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "white",
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
      {/* Left Section */}
      <Box sx={{ flex: 1, p: 2, marginLeft: { xs: 4, sm: 10, md: 10, lg: 50 } }}>
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
          <Typography variant="h6">Create your Shop Page</Typography>
          <Divider sx={{ my: 2 }} />

          <Link underline="none">
            <Typography
              variant="body1"
              sx={{
                color: "primary.main",
                textTransform: "none",
                cursor: "pointer",
              }}
            >
              1. Enter your shop details
            </Typography>
          </Link>
          <Typography variant="body2" color="textSecondary">
            Shop name, address, contact no., owner details
          </Typography>

          <Link href="/updateshop" underline="none">
            <Typography
              variant="body1"
              sx={{
                color: "text.primary",
                textTransform: "none",
                cursor: "pointer",
                mt: 2,
              }}
            >
              2. Update your shop details
            </Typography>
          </Link>
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

      {/* Right Section */}
      <Box sx={{ flex: 2, p: 2, marginLeft: { xs: 4, sm: 25, md: -5, lg: -30 } }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Shop Details</Typography>

        <form onSubmit={handleSubmit}>
          {renderSection("Enter your shop details", "details", (
            <>
              {renderTextField("Shop email", "email")}
              {renderTextField("Shop name", "name")}
              {renderTextField("Shop Description", "description")}
              {renderTextField("State", "state")}
              {renderTextField("City", "city")}
              {renderTextField("Enter your shop’s locality, e.g., Sector 43", "location")}
              {renderTextField("Landmark", "landmark")}
              {renderTextField("Phone number", "phone", "tel")}
              {renderTextField("Image URL", "image")}
              {renderTextField("Rating", "rating", "number", { inputProps: { min: 0, max: 5 } })}
              {renderTextField("Comment", "comment")}
              {renderTextField("Type", "ptype")}
              {renderTextField("Search", "search")}
              <Box sx={{ display: "flex", alignItems: "center", flexDirection: { xs: "column", sm: "row" } }}>
                <Button variant="contained" type="submit" disabled={loading}>
                  {loading ? "Submitting..." : "Submit"}
                </Button>
                <Button variant="outlined" sx={{ ml: { sm: 2 }, mt: { xs: 2, sm: 0 } }} onClick={() => router.push('/')}>Cancel</Button>
              </Box>
            </>
          ))}
        </form>
      </Box>
    </Paper>
  );
}

export default CreateShop;
