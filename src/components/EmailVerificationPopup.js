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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

const EmailVerificationPopup = ({ open, onClose, email,handleOpenLoginFromSignup }) => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onVerify = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/verifyemail", { email, token });
      toast.success("Verification successful. Redirecting to login...");
      onClose();
      handleOpenLoginFromSignup();
    } catch (error) {
      console.log("Verification failed", error.message);
      toast.error(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(token.length > 0));
  }, [token]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>
        Verify OTP
        <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Stack spacing={2} padding={2} component="form" onSubmit={onVerify}>
        <Typography variant="body1" textAlign="center">
          Please enter the OTP sent to {email}.
        </Typography>
        <TextField
          label="OTP"
          variant="outlined"
          fullWidth
          value={token}
          onChange={(e) => setToken(e.target.value)}
          required
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          disabled={buttonDisabled || loading}
          onClick={onVerify}
          sx={{ opacity: buttonDisabled || loading ? 0.5 : 1, cursor: buttonDisabled || loading ? "not-allowed" : "pointer" }}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </Button>
      </Stack>
    </Dialog>
  );
};

export default EmailVerificationPopup;
