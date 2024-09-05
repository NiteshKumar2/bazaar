"use client";
import React, { useState } from "react";
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

function updateshop() {
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
          <Link href="/createshop" >
            <Typography
              variant="body1"
              onClick={() => handleStepClick(1)}
              sx={{
                color: activeStep === 1 ? "primary.main" : "text.primary",
                textTransform: "none",
                cursor: "pointer",
              }}
            >
              1 Enter your shop details
            </Typography>
          </Link>
          <Typography variant="body2" color="textSecondary">
            Shop name, address, contact no., owner details
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
            2 Update your shop details
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Establishment & cuisine type, opening hours
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
          <Typography variant="body2" color="textSecondary">
            Name, address, and location
          </Typography>
          <TextField label="Shop name" fullWidth margin="normal" />
          <TextField label="Shop Description" fullWidth margin="normal" />
          <TextField label="State" fullWidth margin="normal" />
          <TextField label="City" fullWidth margin="normal" />
          <TextField
            label="Enter your shop’s locality, e.g., Sector 43, Gurgaon"
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
          <Typography variant="body2" color="textSecondary">
            Please place the pin accurately at your outlet’s location on the map
          </Typography>
          <TextField label="Landmark" fullWidth margin="normal" />
          <Box sx={{ display: "flex", alignItems: "center", flexDirection: { xs: "column", sm: "row" } }}>
            <TextField label="Phone number" fullWidth margin="normal" />
            <Button variant="contained" sx={{ mt: { xs: 2, sm: 0 }, ml: { sm: 2 } }}>
              Verify
            </Button>
          </Box>
          <TextField label="Image" fullWidth margin="normal" />
          <TextField label="Rating" fullWidth margin="normal" />
          <TextField label="Comment" fullWidth margin="normal" />
          <Box sx={{ display: "flex", alignItems: "center", flexDirection: { xs: "column", sm: "row" } }}>
            <Button variant="contained" sx={{ mt: { xs: 2, sm: 0 }, ml: { sm: 2 } }}>
              Update
            </Button>
            <Button variant="contained" sx={{ mt: { xs: 2, sm: 0 }, ml: { sm: 2 } }}>
              Cancel
            </Button>
          </Box>
        </ToggleableSection>

        {/* Contact Number Section */}
        <ToggleableSection title="Update your shop details" open={openContactNumber} toggle={() => setOpenContactNumber(!openContactNumber)}>
          <TextField label="Phone number" fullWidth margin="normal" />
          <Box sx={{ display: "flex", alignItems: "center", flexDirection: { xs: "column", sm: "row" } }}>
            <Button variant="contained" sx={{ mt: { xs: 2, sm: 0 }, ml: { sm: 2 } }}>
              Verify
            </Button>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", flexDirection: { xs: "column", sm: "row" } }}>
            <Button variant="contained" sx={{ mt: { xs: 2, sm: 0 }, ml: { sm: 2 } }}>
              Update
            </Button>
            <Button variant="contained" sx={{ mt: { xs: 2, sm: 0 }, ml: { sm: 2 } }}>
              Cancel
            </Button>
          </Box>
        </ToggleableSection>
      </Box>
    </Paper>
  );
}

export default updateshop;
