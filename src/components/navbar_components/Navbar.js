"use client";

import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  CardMedia,
  Container,
  Toolbar,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import LocationSearchComponent from "./LocationSearchComponent";
import LoginPopup from "./LoginPopup";
import SignupPopup from "./SignupPopup";

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

            {/* Center: Location Search */}
            <LocationSearchComponent />

            {/* Right: Login and Signup Buttons */}
            <Box
              sx={{
                display: { xs: "none", sm: "flex", md: "flex" },
                alignItems: "center",
              }}
            >
              <Stack direction="row" spacing={2}>
                {session ? (
                  <>
                    <Link href={"/addproduct"}>
                      <Typography style={{ marginTop: 9 }}>
                        Add Shop/Product
                      </Typography>
                    </Link>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => signOut()}
                      sx={{ minWidth: "100px" }}
                    >
                      Log out
                    </Button>
                  </>
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

            {/* Mobile: Menu for Login and Signup */}
            <Box
              sx={{
                display: { xs: "flex", sm: "none", md: "none" },
                alignItems: "center",
              }}
            >
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
                  <>
                    <Link key="shop" href={"/addproduct"}>
                      <Typography style={{ marginTop: 9, textAlign: "center" }}>
                        Product
                      </Typography>
                    </Link>
                    <MenuItem key="logout" onClick={() => signOut()}>
                      Log out
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem key="login" onClick={handleOpenLoginPopup}>
                      Log in
                    </MenuItem>
                    <MenuItem key="signup" onClick={handleOpenSignupPopup}>
                      Sign up
                    </MenuItem>
                  </>
                )}
              </Menu>
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
