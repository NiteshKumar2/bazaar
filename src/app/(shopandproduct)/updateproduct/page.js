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

const DetailSection = ({ title, toggle, isOpen, children }) => (
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
        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>
    </Box>
    <Collapse in={isOpen}>
      <Divider sx={{ my: 2 }} />
      {children}
    </Collapse>
  </Box>
);

function updateproduct() {
  const [activeStep, setActiveStep] = useState(1);
  const [openDetails, setOpenDetails] = useState(false);
  const [openContactNumber, setOpenContactNumber] = useState(false);

  const handleStepClick = (step) => {
    setActiveStep(step);
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
        height: "100%",
      }}
    >
      {/* Left Container */}
      <Box sx={{ flex: 1, p: 2, ml: { xs: 4, sm: 25, md: 10, lg: 50 } }}>
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
          <Typography variant="h6">Create your Product page</Typography>
          <Divider sx={{ my: 2 }} />
          <Link href="/createproduct" >
            <Typography
              variant="body1"
              onClick={() => handleStepClick(1)}
              sx={{
                color: activeStep === 1 ? "primary.main" : "text.primary",
                textTransform: "none",
                cursor: "pointer",
              }}
            >
              1 Enter your Product details
            </Typography>
          </Link>
          <Typography variant="body2" color="textSecondary">
            Product name, address, contact no. details
          </Typography>
          <Typography
            variant="body1"
            onClick={() => handleStepClick(2)}
            sx={{
              color: activeStep === 2 ? "primary.main" : "text.primary",
              textTransform: "none",
              cursor: "pointer",
            }}
          >
            2 Update your Product details
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Establishment & cuisine type, opening hours
          </Typography>
        </Box>
      </Box>

      {/* Right Section */}
      <Box sx={{ flex: 2, p: 2, ml: { xs: 4, sm: 25, md: -5, lg: -30 } }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Product Update
        </Typography>

        {/* Product Details Section */}
        <DetailSection
          title="Enter your Product details"
          toggle={() => setOpenDetails(!openDetails)}
          isOpen={openDetails}
        >
          <Typography variant="body2" color="textSecondary">
            Name, address, and location
          </Typography>
          <TextField label="Product Type" fullWidth margin="normal" />
          <TextField label="Product Size" fullWidth margin="normal" />
          <TextField label="Price Range" fullWidth margin="normal" />
          <TextField label="Product Color" fullWidth margin="normal" />
          <TextField label="Product Photo" fullWidth margin="normal" />
          <TextField label="Subtype" fullWidth margin="normal" />
          <TextField label="Image" fullWidth margin="normal" />
          <TextField label="Gender" fullWidth margin="normal" />
          <TextField label="Discount" fullWidth margin="normal" />
          <TextField label="Stock Status" fullWidth margin="normal" />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" sx={{ ml: 2 }}>
              Update
            </Button>
            <Button variant="contained" sx={{ ml: 2 }}>
              Cancel
            </Button>
          </Box>
        </DetailSection>

        {/* Contact Number Section */}
        <DetailSection
          title="Update your Product details"
          toggle={() => setOpenContactNumber(!openContactNumber)}
          isOpen={openContactNumber}
        >
          <TextField label="Product Number" fullWidth margin="normal" />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" sx={{ ml: 2 }}>
              Verify
            </Button>
            <Button variant="contained" sx={{ ml: 2 }}>
              Update
            </Button>
            <Button variant="contained" sx={{ ml: 2 }}>
              Cancel
            </Button>
          </Box>
        </DetailSection>
      </Box>
    </Paper>
  );
}

export default updateproduct;
