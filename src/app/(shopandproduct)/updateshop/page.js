"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
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
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  InputLabel,
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

const FormField = ({ label, name, value, onChange, fullWidth = true }) => (
  <TextField
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    fullWidth={fullWidth}
    margin="normal"
  />
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
    ptype: [],
    search: "",
  });

  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [openDetails, setOpenDetails] = useState(false);

  const fetchUserDetails = async (email) => {
    try {
      const response = await axios.get(`/api/userdetails?email=${email}`);
      setUserDetail(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      toast.error("Error fetching user details: " + error.message);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const fetchSessionAndUserDetails = async () => {
      const session = await getSession();
      if (session?.user) {
        fetchUserDetails(session.user.email);
      } else {
        toast.error("User not authenticated.");
        router.push("/");
      }
    };
    fetchSessionAndUserDetails();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetail((prev) => ({ ...prev, [name]: value }));
  };
  const handlePtypeChange = (event) => {
    const {
      target: { value },
    } = event;
    setUserDetail((prev) => ({
      ...prev,
      ptype: typeof value === "string" ? value.split(",") : value, // Handle multiple selections
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!userDetail.name || !userDetail.email) {
      toast.error("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      await axios.put("/api/userdetails", userDetail);
      toast.success("User details updated successfully!");
      router.push("/");
    } catch (error) {
      console.error("Update failed", error.message);
      toast.error("Update failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserDetail((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
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
      <Box
        sx={{ flex: 1, p: 2, marginLeft: { xs: 4, sm: 25, md: 10, lg: 50 } }}
      >
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
          <Typography
            variant="body1"
            sx={{ cursor: "pointer", color: "primary.main", mt: 2 }}
          >
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
              3. Your product details
            </Typography>
          </Link>
          <Typography variant="body2" color="textSecondary">
            Product name, address, and contact number
          </Typography>
        </Box>
      </Box>

      {/* Right Container */}
      <Box
        sx={{ flex: 2, p: 2, marginLeft: { xs: 4, sm: 25, md: -5, lg: -30 } }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Shop Update
        </Typography>

        {/* Shopping Details Section */}
        <ToggleableSection
          title="Enter your shop details"
          open={openDetails}
          toggle={() => setOpenDetails(!openDetails)}
        >
          {isFetching ? (
            <Typography variant="body2">Loading user details...</Typography>
          ) : (
            <form onSubmit={handleUpdate}>
              <FormField
                label="Shop email"
                name="email"
                value={userDetail.email}
                onChange={handleChange}
              />
              <FormField
                label="Shop name"
                name="name"
                value={userDetail.name}
                onChange={handleChange}
              />
              <FormField
                label="Shop Description"
                name="description"
                value={userDetail.description}
                onChange={handleChange}
              />
              <FormField
                label="State"
                name="state"
                value={userDetail.state}
                onChange={handleChange}
              />
              <FormField
                label="City"
                name="city"
                value={userDetail.city}
                onChange={handleChange}
              />
              <FormField
                label="Enter your shop’s locality, e.g., Sector 43, Gurgaon"
                name="location"
                value={userDetail.location}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormField
                label="Landmark"
                name="landmark"
                value={userDetail.landmark}
                onChange={handleChange}
              />
              <FormField
                label="Phone number"
                name="phone"
                value={userDetail.phone}
                onChange={handleChange}
              />
              <FormField
                label="Rating (options are 5,4,3)"
                name="rating"
                value={userDetail.rating}
                onChange={handleChange}
              />
              <FormField
                label="Comment"
                name="comment"
                value={userDetail.comment}
                onChange={handleChange}
              />
              <FormField
                label="Search (divide by ||)"
                name="search"
                value={userDetail.search}
                onChange={handleChange}
              />
              <InputLabel id="ptype-label">Type</InputLabel>
              <Select
                labelId="ptype-label"
                style={{ margintop: 10, marginBottom: 10 }}
                multiple
                fullWidth
                value={userDetail.ptype}
                onChange={handlePtypeChange}
                renderValue={(selected) => selected.join(", ")} // Display selected values as comma-separated string
              >
                {["male", "female", "child"].map((type) => (
                  <MenuItem key={type} value={type}>
                    <Checkbox checked={userDetail.ptype.indexOf(type) > -1} />
                    <ListItemText primary={type} />
                  </MenuItem>
                ))}
              </Select>

              <input
                accept="image/*"
                type="file"
                onChange={handleImageChange}
              />
              {userDetail.image && (
                <img
                  src={userDetail.image}
                  alt="Uploaded preview"
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginTop: 10,
                  }}
                />
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? "Updating..." : "Update Shop"}
              </Button>
            </form>
          )}
        </ToggleableSection>
      </Box>
    </Paper>
  );
}
