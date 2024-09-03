'use client';

import React, { useState } from "react";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Divider,
  TextField,
  Typography
} from "@mui/material";
import TuneIcon from "@mui/icons-material/Tune";

function FilterSection() {
  const [openFilters, setOpenFilters] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Sort by"); // Set a default option
  const [searchText, setSearchText] = useState("");

  const handleClickOpenFilters = () => setOpenFilters(true);

  const handleCloseFilters = () => {
    setOpenFilters(false);
    setSelectedOption("Sort by"); // Reset to default option when closing
    setSearchText("");
  };

  const handleOptionChange = (event) => setSelectedOption(event.target.value);

  const handleSearchChange = (event) => setSearchText(event.target.value);

  const renderRightSideOptions = () => {
    switch (selectedOption) {
      case "Sort by":
        return (
          <RadioGroup>
            {["Popularity", "Rating: High to Low", "Delivery Time", "Cost: Low to High", "Cost: High to Low"].map((option) => (
              <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
        );
      case "Cuisines":
        return (
          <Box>
            <DialogContentText>Search Cuisines</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="cuisine-search"
              label="Search Cuisines"
              type="text"
              fullWidth
              variant="standard"
              value={searchText}
              onChange={handleSearchChange}
            />
          </Box>
        );
      case "Rating":
        return (
          <RadioGroup>
            {["Any", "3.5", "4.0", "4.5", "5.0"].map((rating) => (
              <FormControlLabel key={rating} value={rating} control={<Radio />} label={rating} />
            ))}
          </RadioGroup>
        );
      case "Cost per person":
        return <DialogContentText>Cost: High to Low</DialogContentText>;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", mt: "-1px", ml: 5 }}>

      <Box
        sx={{
          marginTop: { xs: 10, md: 15, lg: 15 },
          marginLeft: { xs: -2, md: 47, lg: 47 },
          width: { xs: "100%", md: "66.66%", lg: "50%" }, // Responsive width
        }}
      >
        <Typography
          sx={{
            color: "black", // Assuming primary is defined in your theme
            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" }, // Responsive font size
            marginBottom: { xs: 0.5, sm: 1, md: 1.5 }, // Responsive margin bottom
          }}
        >
          Home / India / Agra / Restaurant
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 2,
          gap: 2,
          ml: { xs: -4, sm: 10, md: 15, lg: 20, xl: 45 }, // Responsive margin
        }}
      >
        <Button
          variant="contained"
          color="grey"
          startIcon={<TuneIcon />}
          onClick={handleClickOpenFilters}
          sx={{
            mb: 1,
            p: -7,
            width: { xs: 90, sm: 90, md: 90 }, // Responsive width
            height: { xs: 25, sm: 30, md: 35 }, // Responsive height
            fontSize: { xs: "0.7rem", sm: "0.8rem", md: ".8rem" }, // Responsive font siz
          }}
        >
          Filters
        </Button>
      </Box>

      <Dialog open={openFilters} onClose={handleCloseFilters}>
        <DialogTitle>Filters</DialogTitle>
        <Divider />
        <DialogContent>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1, mr:  10}}>
              <FormControl component="fieldset">
                <RadioGroup value={selectedOption} onChange={handleOptionChange}>
                  {["Sort by", "Cuisines", "Rating", "Cost per person"].map((option) => (
                    <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                  ))}
                </RadioGroup>
              </FormControl>
            </Box>
            <Box sx={{ flex: 1, ml: 2 }}>{renderRightSideOptions()}</Box>
          </Box>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleCloseFilters} color="primary">
            Clear all
          </Button>
          <Button onClick={handleCloseFilters} color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default FilterSection;
