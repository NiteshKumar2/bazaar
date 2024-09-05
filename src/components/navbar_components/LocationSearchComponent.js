import React, { useState, useEffect } from "react";
import { Box, Paper, InputBase, Button, TextField, Autocomplete } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios"; // Import axios

export default function LocationSearchComponent() {
    const router = useRouter();
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [cityDetail, setCityDetail] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

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

        fetchCityDetails(); // Fetch city details on component mount
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();
        if (selectedLocation) {
            toast.success(`Selected Location: ${selectedLocation}`);
            router.push(`/shopenearme?location=${selectedLocation}`);
        } else {
            toast.error("Please select a location.");
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "left",
                flexGrow: 1,
                gap: 0.1,
                p: -1,
                flexWrap: "wrap",
                mr: { xs: 1, sm: 10, md: 10 },
            }}
        >
            <Box
                component="form"
                onSubmit={handleSearch}
                sx={{ flexGrow: 2 }}
            >
                <Autocomplete
                    disablePortal
                    options={cityDetail}
                    getOptionLabel={(option) => option} // Display city name
                    onChange={(event, newValue) => {
                        setSelectedLocation(newValue); // Set the selected location
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
                />
                <Button type="submit" sx={{ p: "10px" }} aria-label="search">
                    <SearchIcon />
                </Button>
            </Paper>
        </Box>
    );
}
