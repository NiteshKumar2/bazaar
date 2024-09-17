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
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  InputLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { getSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const RenderTextField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  ...props
}) => (
  <Box sx={{ mt: 2 }}>
    <TextField
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      fullWidth
      margin="normal"
      {...props}
    />
  </Box>
);

const RenderSection = (
  ({ title, sectionKey, isOpen, toggleSection, children }) => (
    <Box
      sx={{
        mb: 4,
        p: 2,
        border: "1px dashed grey",
        width: { xs: 250, sm: 300, md: 500 },
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
        <IconButton onClick={() => toggleSection(sectionKey)}>
          {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <Collapse in={isOpen}>
        <Divider sx={{ my: 2 }} />
        {children}
      </Collapse>
    </Box>
  )
);

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
    ptype: [],
    search: "",
  });

  const [openSections, setOpenSections] = useState({ details: false });

  const fetchUserDetails = async (email) => {
    try {
      await axios.get(`/api/userdetails?email=${email}`);
      router.push("/updateshop");
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      toast.error("Failed to fetch user details.");
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const fetchSessionAndUserDetails = async () => {
      const session = await getSession();
      if (session?.user) {
        setShopDetails((prev) => ({ ...prev, email: session.user.email }));
        fetchUserDetails(session.user.email);
      } else {
        toast.error("User not authenticated.");
        router.push("/login");
      }
    };
    fetchSessionAndUserDetails();
  }, [router]);

  const toggleSection = (section) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShopDetails((prev) => ({ ...prev, [name]: value }));
  };
  const handlePtypeChange = (event) => {
    const {
      target: { value },
    } = event;
    setShopDetails((prev) => ({
      ...prev,
      ptype: typeof value === "string" ? value.split(",") : value, // Handle multiple selections
    }));
  };

  const validateFields = () => {
    const requiredFields = ["name", "description", "phone", "image", "rating"];
    for (const field of requiredFields) {
      if (!shopDetails[field]) {
        toast.error(`Please fill in the ${field} field.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    setLoading(true);
    try {
      await axios.post("/api/userdetails", shopDetails);
      toast.success("Shop details created successfully!");
      router.push("/updateshop");
    } catch (error) {
      toast.error("Failed to create shop details: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setShopDetails((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

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
      <Box
        sx={{ flex: 1, p: 2, marginLeft: { xs: 4, sm: 10, md: 10, lg: 50 } }}
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
          <Typography variant="h6">Create your Shop Page</Typography>
          <Divider sx={{ my: 2 }} />
          <Link underline="none">
            <Typography
              variant="body1"
              sx={{ color: "primary.main", cursor: "pointer" }}
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
              sx={{ color: "text.primary", cursor: "pointer", mt: 2 }}
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
              sx={{ color: "text.primary", cursor: "pointer", mt: 2 }}
            >
              3. Your product details
            </Typography>
          </Link>
          <Typography variant="body2" color="textSecondary">
            Product name, address, and contact number
          </Typography>
        </Box>
      </Box>

      {/* Right Section */}
      <Box
        sx={{ flex: 2, p: 2, marginLeft: { xs: 4, sm: 25, md: -5, lg: -30 } }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Shop Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <RenderSection
            title="Enter your shop details"
            sectionKey="details"
            isOpen={openSections.details}
            toggleSection={toggleSection}
          >
            <>
              <RenderTextField
                label="Shop email"
                name="email"
                value={shopDetails.email}
                disabled
              />
              <RenderTextField
                label="Shop name"
                name="name"
                value={shopDetails.name}
                onChange={handleChange}
              />
              <RenderTextField
                label="Shop Description"
                name="description"
                value={shopDetails.description}
                onChange={handleChange}
              />
              <RenderTextField
                label="State"
                name="state"
                value={shopDetails.state}
                onChange={handleChange}
              />
              <RenderTextField
                label="City"
                name="city"
                value={shopDetails.city}
                onChange={handleChange}
              />
              <RenderTextField
                label="Enter your shop’s locality, e.g., Sector 43"
                name="location"
                value={shopDetails.location}
                onChange={handleChange}
              />
              <RenderTextField
                label="Landmark"
                name="landmark"
                value={shopDetails.landmark}
                onChange={handleChange}
              />
              <RenderTextField
                label="Phone number"
                name="phone"
                type="tel"
                value={shopDetails.phone}
                onChange={handleChange}
              />
              <RenderTextField
                label="Rating (options are 5,4,3)"
                name="rating"
                type="number"
                value={shopDetails.rating}
                onChange={handleChange}
                inputProps={{ min: 0, max: 5 }}
              />
              <RenderTextField
                label="Comment"
                name="comment"
                value={shopDetails.comment}
                onChange={handleChange}
              />
              <RenderTextField
                label="Search (divide by ||)"
                name="search"
                style={{ marginBottom: 10 }}
                value={shopDetails.search}
                onChange={handleChange}
              />
              <InputLabel id="ptype-label">Type</InputLabel>
              <Select
                labelId="ptype-label"
                style={{ margintop: 10, marginBottom: 10 }}
                fullWidth
                multiple
                value={shopDetails.ptype}
                onChange={handlePtypeChange}
                renderValue={(selected) => selected.join(", ")} // Display selected values as comma-separated string
              >
                {["male", "female", "child"].map((type) => (
                  <MenuItem key={type} value={type}>
                    <Checkbox checked={shopDetails.ptype.indexOf(type) > -1} />
                    <ListItemText primary={type} />
                  </MenuItem>
                ))}
              </Select>

              <input
                style={{ margin: 10 }}
                accept="image/*"
                type="file"
                onChange={handleImageChange}
              />
              {shopDetails.image && (
                <img
                  src={shopDetails.image}
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Create Shop"}
                </Button>
              </Box>
            </>
          </RenderSection>
        </form>
      </Box>
    </Paper>
  );
}

export default CreateShop;
