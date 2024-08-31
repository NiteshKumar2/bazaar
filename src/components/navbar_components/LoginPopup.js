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
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import ForgotPasswordPopup from "./ForgotPasswordPopup";

const LoginPopup = ({ open, onClose, handleOpenSignupPopup }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await signIn("credentials", {
        email: user.email,
        password: user.password,
        callbackUrl: "/",
        redirect: false,
      });

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Login successful");
        window.location.href = result.url;
      }
    } catch (error) {
      console.log("Login failed", error.message);
      toast.error("An error occurred while logging in.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  const handleForgotPasswordOpen = () => {
    onClose(); // Close the login popup
    setOpenForgotPassword(true); // Open the forgot password popup
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle>
          Log In
          <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Stack spacing={2} padding={2} component="form" onSubmit={onLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            sx={{ textAlign: "center", width: { xs: "90%", sm: "70%", md: "70%" } }}
          />
          <Typography
            variant="body2"
            sx={{ textAlign: { xs: "right", sm: "center", md: "center" } }}
            style={{ color: "blue", marginBottom: "-14px", cursor: "pointer" }}
            onClick={handleForgotPasswordOpen} // Call the new function here
          >
            Forgot Password?
          </Typography>
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            sx={{ textAlign: "center", width: { xs: "90%", sm: "70%", md: "70%" } }}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={buttonDisabled || loading}
            sx={{ opacity: buttonDisabled || loading ? 0.5 : 1, cursor: buttonDisabled || loading ? "not-allowed" : "pointer" }}
          >
            {loading ? "Logging in..." : "Log In"}
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
          <Typography variant="body2" textAlign="center" onClick={handleOpenSignupPopup} style={{ cursor: "pointer" }}>
            New to BazarNear?{" "}
            <span style={{ color: "red" }}>Create account</span>
          </Typography>
        </Stack>
      </Dialog>

      {/* Forgot Password Popup */}
      <ForgotPasswordPopup open={openForgotPassword} onClose={() => setOpenForgotPassword(false)} />
    </>
  );
};

export default LoginPopup;
