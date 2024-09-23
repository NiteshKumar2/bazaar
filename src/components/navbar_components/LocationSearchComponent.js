import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  InputBase,
  Button,
  TextField,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios"; // Import axios

export default function LocationSearchComponent() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState("");
  const [cityDetail, setCityDetail] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [query, setQuery] = useState("");

  // Fetch city details on component mount
  useEffect(() => {
    const fetchCityDetails = async () => {
      setIsFetching(true);
      try {
        const response = await axios.get(`/api/search/city`);
        if (response.data.success) {
          setCityDetail(response.data.data || []);
        } else {
          toast.error("Failed to fetch cities.");
        }
      } catch (error) {
        console.error("Error fetching city details:", error.message);
        toast.error("Error fetching city details.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchCityDetails();
  }, []);

  const handleSearch = (location) => {
    if (location) {
      toast.success(`Selected Location: ${location}`);
      router.push(`/shopnearme?location=${location}`);
      setSelectedLocation(""); // Clear selection after search
    } else {
      toast.error("Please select a location.");
    }
  };

  const handleQuerySearch = (event) => {
    event.preventDefault();
    if (query) {
      toast.success(`Selected query: ${query}`);
      router.push(`/shopnearme?query=${query}`);
      setQuery(""); // Clear query after search
    } else {
      toast.error("Please enter a query.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexGrow: 1,
        gap: 0.1,
        p: 0,
        flexWrap: "wrap",
        mr: { xs: -0.5, sm: 10, md: 10 },
      }}
    >
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(selectedLocation);
        }}
        sx={{ flexGrow: 2 }}
      >
        <Autocomplete
          disablePortal
          options={cityDetail}
          getOptionLabel={(option) => option} // Display city name
          onChange={(event, newValue) => {
            setSelectedLocation(newValue); // Set the selected location
            if (newValue) {
              handleSearch(newValue); // Automatically trigger search when an option is selected
            }
          }}
          sx={{ width: { xs: "95%", sm: "90%", md: "90%" }, display: "flex" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Location"
              variant="outlined"
              size="small"
              sx={{
                backgroundColor: "white",
                borderRadius: 1,
              }}
            />
          )}
        />
      </Box>

      <Paper
        component="form"
        onSubmit={handleQuerySearch}
        sx={{
          display: "flex",
          alignItems: "center",
          width: "50%",
          maxWidth: 300,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "Search" }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          type="submit"
          sx={{ p: "10px" }}
          aria-label="search"
          disabled={isFetching || !query}
        >
          {isFetching ? <CircularProgress size={24} /> : <SearchIcon />}
        </Button>
      </Paper>
    </Box>
  );
}
