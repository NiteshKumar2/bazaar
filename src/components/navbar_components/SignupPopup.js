"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast } from "react-hot-toast";
import EmailVerificationPopup from "./EmailVerificationPopup"; // Import EmailVerificationPopup

const SignupPopup = ({ open, onClose, handleOpenLoginFromSignup }) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openOtpPopup, setOpenOtpPopup] = useState(false);

  const onSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/signup", user);
      toast.success("Signup successful, please check your email for verification.");
      onClose(); // Close Signup popup
      setOpenOtpPopup(true); // Open OTP popup
    } catch (error) {
      console.log("Signup failed", error.message);
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.username && user.email && user.password));
  }, [user]);

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle>
          Sign Up
          <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Stack spacing={2} padding={2} component="form" onSubmit={onSignup}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            required
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            disabled={buttonDisabled || loading}
            sx={{ opacity: buttonDisabled || loading ? 0.5 : 1, cursor: buttonDisabled || loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
          <Divider>or</Divider>
          <Button
            color="primary"
            variant="contained"
            fullWidth
            onClick={() => signIn('google')}
          >
            Sign in with Google
          </Button>
          <Typography
            variant="body2"
            textAlign="center"
            onClick={handleOpenLoginFromSignup}
            style={{ cursor: "pointer" }}
          >
            Already have an account?{" "}
            <span style={{ color: "red" }}>Log in</span>
          </Typography>
        </Stack>
      </Dialog>
      
      {/* OTP Verification Popup */}
      <EmailVerificationPopup
        open={openOtpPopup}
        onClose={() => setOpenOtpPopup(false)}
        email={user.email}
        handleOpenLoginFromSignup={handleOpenLoginFromSignup}
      />
    </>
  );
};

export default SignupPopup;
