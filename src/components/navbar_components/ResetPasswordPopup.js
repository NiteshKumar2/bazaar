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

const ResetPasswordPopup = ({ open, onClose, email }) => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/verifyforgotpassword", { email, token, password });
      toast.success(response.data.message);
      onClose(); // Close the popup after successful reset
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setButtonDisabled(!(token && password));
  }, [token, password]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        Reset Password
        <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Stack spacing={2} padding={2} component="form" onSubmit={handleSubmit}>
        <TextField
          label="Token"
          variant="outlined"
          fullWidth
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />
        <TextField
          label="New Password"
          variant="outlined"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          disabled={buttonDisabled || loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </Stack>
    </Dialog>
  );
};

export default ResetPasswordPopup;
