"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { toast } from "react-hot-toast";
import ResetPasswordPopup from "./ResetPasswordPopup";

const ForgotPasswordPopup = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [openResetPassword, setOpenResetPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/forgotpassword", { email });
      toast.success(response.data.message);
      onClose(); // Close the popup after successful reset
      setOpenResetPassword(true); // Open Reset Password Popup
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle>
          Forgot Password
          <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Stack spacing={2} padding={2} component="form" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </Stack>
      </Dialog>

      {/* Reset Password Popup */}
      <ResetPasswordPopup open={openResetPassword} onClose={() => setOpenResetPassword(false)} email={email} />
    </>
  );
};

export default ForgotPasswordPopup;
