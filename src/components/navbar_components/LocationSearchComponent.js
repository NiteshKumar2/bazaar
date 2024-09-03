import React from "react";
import { Box, Paper, InputBase, Button, TextField, Autocomplete } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const top100Location = [
  { city: "jind", state: "haryana" },
  { city: "rohtak", state: "haryana" },
  { city: "panipat", state: "haryana" },
  { city: "sonipat", state: "haryana" },
  { city: "karnal", state: "haryana" },
];

export default function LocationSearchComponent() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 2,
        gap: 1,
        p: 0.5,
        flexWrap: "wrap",
      }}
    >
      <Autocomplete
        disablePortal
        options={top100Location}
        getOptionLabel={(option) => `${option.city} (${option.state})`}
        sx={{ width: { xs: "40%", sm: "40%", md: "40%" } }}
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

      <Paper
        component="form"
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
