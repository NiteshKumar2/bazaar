"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  IconButton,
  Divider,
  Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Link from "@mui/material/Link";

function createproduct() {
  const [activeStep, setActiveStep] = useState(1);
  const [openDetails, setOpenDetails] = useState(false);
  const [openContactNumber, setOpenContactNumber] = useState(false);

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  const toggleDetails = () => {
    setOpenDetails(!openDetails);
  };

  const toggleContactNumber = () => {
    setOpenContactNumber(!openContactNumber);
  };

  return (
    <Paper
      sx={{
        position: "relative",
        backgroundColor: "white",
        color: "#000",
        mb: 4,
        mt:8,
        p: 4,
        display: "flex",
        justifyContent: "space-between",
        gap: 4,
        flexDirection: { xs: "column", md: "row" },
        
        width: "100%",
      }}
    >
      {/* Left Container */}
      <Box sx={{ flex: 1, p: 2, ml: { xs: 4, sm: 25, md: 10, lg: 50 } }}>
        <Paper
          sx={{
            backgroundColor: "white",
            p: 2,
            boxShadow: "0 0 30px rgba(0, 0, 255, 0.5)",
            borderRadius: 1,
            mb: 4,
            width: { xs: "100%", sm: 400 },
          }}
        >
          <Typography variant="h6" gutterBottom>
            Create your Product Page
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Typography
            variant="body1"
            onClick={() => handleStepClick(1)}
            sx={{
              color: activeStep === 1 ? "primary.main" : "text.primary",
              textTransform: "none",
              cursor: "pointer",
            }}
          >
            1. Enter your Product Details
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Product name, address, and contact number
          </Typography>
          <Link href="/updateproduct" >
            <Typography
              variant="body1"
              onClick={() => handleStepClick(2)}
              sx={{
                color: activeStep === 2 ? "primary.main" : "text.primary",
                textTransform: "none",
                cursor: "pointer",
              }}
            >
              2. Update your Product Details
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Establishment type, cuisine, and opening hours
            </Typography>
          </Link>
        </Paper>
      </Box>

      {/* Right Container */}
      <Box sx={{ flex: 2, p: 2, marginLeft: { xs: 0, sm: 2, md: -5, lg: -10 } }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Product Information
        </Typography>

        {/* Enter Product Details Section */}
        <Box
          sx={{
            mb: 4,
            p: 2,
            border: "1px dashed grey",
            borderRadius: 1,
            width: { xs: "100%", sm: 300, md: 500 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Enter Product Details</Typography>
            <IconButton onClick={toggleDetails}>
              {openDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          <Collapse in={openDetails}>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ mt: 2 }}>
              <TextField label="Product Type" fullWidth margin="normal" />
              <TextField label="Product Size" fullWidth margin="normal" />
              <TextField label="Price Range" fullWidth margin="normal" />
              <TextField label="Product Color" fullWidth margin="normal" />
              <TextField label="Product Photo" fullWidth margin="normal" />
              <TextField label="Subtype" fullWidth margin="normal" />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: { xs: "column", sm: "row" },
                }}
              >
                <TextField label="Image URL" fullWidth margin="normal" />
                <Button
                  variant="contained"
                  sx={{ mt: { xs: 2, sm: 0 }, ml: { sm: 2 } }}
                >
                  Verify
                </Button>
              </Box>
              <TextField label="Gender" fullWidth margin="normal" />
              <TextField label="Discount" fullWidth margin="normal" />
              <TextField label="Stock Status" fullWidth margin="normal" />
              <Button
                variant="contained"
                sx={{ mt: 2 }}
                fullWidth
              >
                Save
              </Button>
            </Box>
          </Collapse>
        </Box>

        {/* Update Contact Number Section */}
        <Box
          sx={{
            mb: 4,
            p: 2,
            border: "1px dashed grey",
            borderRadius: 1,
            width: { xs: "100%", sm: 300, md: 500 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Update Contact Number</Typography>
            <IconButton onClick={toggleContactNumber}>
              {openContactNumber ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </Box>
          <Collapse in={openContactNumber}>
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <TextField label="Product Number" fullWidth margin="normal" />
              <Button
                variant="contained"
                sx={{ mt: { xs: 2, sm: 0 }, ml: { sm: 2 } }}
              >
                Verify
              </Button>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Button
                variant="contained"
                sx={{ mt: 2 }}
              >
                Update
              </Button>
              <Button
                variant="outlined"
                sx={{ mt: 2, ml: { sm: 2 } }}
              >
                Cancel
              </Button>
            </Box>
          </Collapse>
        </Box>
      </Box>
    </Paper>
  );
}

export default createproduct;
