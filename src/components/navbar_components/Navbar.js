"use client";

import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  CardMedia,
  Container,
  Toolbar,
  Paper,
  InputBase,
  TextField,
  ThemeProvider,
  createTheme,
  Autocomplete,
  Stack,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import LoginPopup from "./LoginPopup";
import SignupPopup from "./SignupPopup";
import { signOut, useSession } from "next-auth/react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#ffffff",
    },
    text: {
      primary: "#000000",
    },
  },
});

export default function Navbar() {
  const { data: session } = useSession(); // Get the session data
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLoginPopup, setOpenLoginPopup] = useState(false);
  const [openSignupPopup, setOpenSignupPopup] = useState(false);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenLoginPopup = () => {
    setOpenLoginPopup(true);
    setAnchorEl(null);
  };

  const handleCloseLoginPopup = () => setOpenLoginPopup(false);

  const handleOpenSignupPopup = () => {
    setOpenSignupPopup(true);
    setOpenLoginPopup(false); // Close login popup
  };

  const handleCloseSignupPopup = () => setOpenSignupPopup(false);

  const handleOpenLoginFromSignup = () => {
    setOpenSignupPopup(false); // Close signup popup
    setOpenLoginPopup(true); // Open login popup
  };

  const top100Location = [
    { label: "New York", places: 100 },
    { label: "Los Angeles", places: 80 },
    { label: "Chicago", places: 60 },
    { label: "Houston", places: 50 },
    { label: "Phoenix", places: 40 },
  ];

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" color="default">
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              justifyContent: "space-between",
              flexWrap: "wrap",
              display: "flex",
              py: 1,
              my: -6,
            }}
          >
            {/* Left: Logo */}
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
              <Link href="/" passHref>
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: 120, sm: 150 },
                    cursor: "pointer",
                    height: "auto",
                    marginLeft: -8,
                    marginRight: -4,
                    marginTop: 2,
                  }}
                  src="/logo.png"
                  alt="Logo"
                />
              </Link>
            </Box>

            {/* Center: Location Input and Search Bar */}
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
                getOptionLabel={(option) =>
                  `${option.label} (${option.places} places)`
                }
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

            {/* Right: Login and Signup Buttons */}
            <Box
              sx={{
                display: { xs: "none", sm: "flex", md: "flex" },
                alignItems: "center",
              }}
            >
              <Stack direction="row" spacing={2}>
                {session ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => signOut()}
                    sx={{ minWidth: "100px" }}
                  >
                    Log out
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleOpenLoginPopup}
                      sx={{ minWidth: "100px" }}
                    >
                      Log in
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleOpenSignupPopup}
                      sx={{ minWidth: "100px" }}
                    >
                      Sign up
                    </Button>
                  </>
                )}
              </Stack>
            </Box>
            <Box
              sx={{
                display: { xs: "flex", sm: "none", md: "none" },
                alignItems: "center",
              }}
            >
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {session ? (
                    <MenuItem onClick={() => signOut()}>Log out</MenuItem>
                  ) : (
                    [
                      <MenuItem key="login" onClick={handleOpenLoginPopup}>
                        Log in
                      </MenuItem>,
                      <MenuItem key="signup" onClick={handleOpenSignupPopup}>
                        Sign up
                      </MenuItem>
                    ]
                  )}
                </Menu>
              </div>
            </Box>
            </Box>
          </Toolbar>
        </Container>

        {/* Login and Signup Popups */}
        <LoginPopup
          open={openLoginPopup}
          onClose={handleCloseLoginPopup}
          handleOpenSignupPopup={handleOpenSignupPopup}
        />
        <SignupPopup
          open={openSignupPopup}
          onClose={handleCloseSignupPopup}
          handleOpenLoginFromSignup={handleOpenLoginFromSignup}
        />
      </AppBar>
    </ThemeProvider>
  );
}
