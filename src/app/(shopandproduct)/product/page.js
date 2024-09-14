"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  IconButton,
  Divider,
  Collapse,
  Link,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import axios from "axios";
import toast from "react-hot-toast";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function Product() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    type: "",
    subtype: "",
    size: "",
    color: "",
    prizerange: "",
    image: "",
    gender: "",
    discount: "",
    stockstatus: "",
  });
  const [openDetails, setOpenDetails] = useState(false);
  const [openUpdateDetails, setOpenUpdateDetails] = useState(false);

  useEffect(() => {
    const fetchSessionAndUserDetails = async () => {
      const session = await getSession();
      if (session && session.user) {
        fetchProductDetails(session.user.email);
        setFormData({ email: session.user.email });
      } else {
        toast.error("User not authenticated.");
        router.push("/");
      }
    };
    fetchSessionAndUserDetails();
  }, [router]);

  const fetchProductDetails = async (email) => {
    try {
      const response = await axios.get("/api/product/userproduct", { params: { email } });
      setProducts(response.data);
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred while fetching products.");
    } finally {
      setIsFetching(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/product/userproduct", formData);
      toast.success(response.data.message);
      fetchProductDetails(formData.email);
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred while creating the product.");
    }
  };

  const handleUpdateChange = (e, index) => {
    const updatedProducts = [...products];
    updatedProducts[index][e.target.name] = e.target.value;
    setProducts(updatedProducts);
  };

  const handleUpdateSubmit = async (e, index) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/product/userproduct?id=${products[index]._id}`, products[index]);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred while updating the product.");
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete("/api/product/userproduct", { params: { id: productId } });
      toast.success(response.data.message);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred while deleting the product.");
    }
  };

  return (
    <Paper
      sx={{
        backgroundColor: "white",
        mb: 4,
        mt: 8,
        p: 4,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        width: "100%",
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
          <Link href="/updateshop" underline="none">
            <Typography variant="body1" sx={{ cursor: "pointer", color: "text.primary", mt: 2, }}>
              2. Update your shop details
            </Typography></Link>
          <Typography variant="body2" color="textSecondary">
            Establishment & cuisine type, opening hours
          </Typography>

          <Link href="/product" underline="none">
            <Typography
              variant="body1"
              sx={{
                color: "primary.main",
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
      <Box sx={{ flex: 2, p: 2, ml: { xs: 0, sm: 2, md: -5, lg: -10 } }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Product Information</Typography>

        {/* Add New Product Section */}
        <Box
          sx={{
            mb: 4,
            p: 2,
            border: "1px dashed grey",
            borderRadius: 1,
            width: { xs: "100%", sm: 300, md: 500 },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">Add New Product</Typography>
            <IconButton onClick={() => setOpenDetails(!openDetails)}>
              {openDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          <Collapse in={openDetails}>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mt: 2 }}>
              {["email", "type", "size", "prizerange", "color", "image", "subtype", "gender", "discount", "stockstatus"].map((field) => (
                <TextField
                  key={field}
                  name={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  sx={{ width: { xs: "45%", sm: "30%", md: "30%" }, margin: 0.7 }}
                  margin="normal"
                  value={formData[field]}
                  onChange={handleChange}
                  InputProps={{ readOnly: field === "email" }} // Make email non-editable
                />
              ))}
              <Button
                variant="contained"
                sx={{ width: { xs: "35%", sm: "20%", md: "20%" }, margin: 1.8 }}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Box>
          </Collapse>
        </Box>

        {/* Update Product Section */}
        <Box
          sx={{
            mb: 4,
            p: 2,
            border: "1px dashed grey",
            borderRadius: 1,
            width: { xs: "100%", sm: 300, md: 500 },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">Update Product Details</Typography>
            <IconButton onClick={() => setOpenUpdateDetails(!openUpdateDetails)}>
              {openUpdateDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          <Collapse in={openUpdateDetails}>
            <Divider sx={{ my: 2 }} />
            {products.map((product, index) => (
              <Box sx={{ mt: 2 }} key={product._id}>
                {["email", "type", "size", "prizerange", "color", "image", "subtype", "gender", "discount", "stockstatus"].map((field) => (
                  <TextField
                    key={field}
                    name={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    sx={{ width: { xs: "45%", sm: "30%", md: "30%" }, margin: 0.7 }}
                    margin="normal"
                    value={product[field]}
                    onChange={(e) => handleUpdateChange(e, index)}
                  />
                ))}
                <Button
                  variant="contained"
                  sx={{ width: { xs: "35%", sm: "18%", md: "18%" }, margin: 1.8 }}
                  onClick={(e) => handleUpdateSubmit(e, index)}
                >
                  Update
                </Button>
                <Button
                  variant="contained"
                  sx={{ width: { xs: "35%", sm: "18%", md: "18%" }, margin: 1.8 }}
                  color="error"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </Button>
                <Divider sx={{ my: 2 }} />
              </Box>
            ))}
          </Collapse>
        </Box>
      </Box>
    </Paper>
  );
}

export default Product;
