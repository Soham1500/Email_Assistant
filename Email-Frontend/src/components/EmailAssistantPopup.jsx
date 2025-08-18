// src/components/EmailAssistantPopup.jsx
import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Paper,
  IconButton,
  Alert,
  Snackbar
} from "@mui/material";
import { Close as CloseIcon, ContentCopy as ContentCopyIcon } from "@mui/icons-material";
import { motion } from "framer-motion";
import axios from "axios";

// Use Render backend or environment variable for flexibility
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "https://email-assistant-9gxg.onrender.com/api";

const EMAIL_TONES = [
  { value: "professional", label: "Professional" },
  { value: "casual", label: "Casual" },
  { value: "friendly", label: "Friendly" },
  { value: "formal", label: "Formal" },
  { value: "sales", label: "Sales" },
  { value: "customer-support", label: "Customer Support" },
];

const EmailAssistantPopup = ({ onClose }) => {
  const [emailInput, setEmailInput] = useState("");
  const [emailTone, setEmailTone] = useState("professional");
  const [aiResponse, setAiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copyStatus, setCopyStatus] = useState("Copy to Clipboard");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmitEmail = async (e) => {
    e.preventDefault();
    const trimmed = emailInput.trim();
    if (!trimmed) {
      setError("Please enter some text to generate a response");
      return;
    }

    setIsLoading(true);
    setError(null);
    setAiResponse("");

    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/email/generate`,
        {
          emailContent: trimmed,
          tone: emailTone,
          language: "english"
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json;charset=UTF-8"
          },
          timeout: 10000
        }
      );

      const responseText = data?.response || data;

      if (!responseText || typeof responseText !== "string") {
        throw new Error("Invalid response from server");
      }

      setAiResponse(responseText);
    } catch (err) {
      let message = "Failed to generate response";
      if (err.code === "ECONNABORTED") {
        message = "Request timed out - please try again";
      } else if (err.response) {
        message =
          err.response.data?.message ||
          err.response.data?.error ||
          `Server error: ${err.response.status}`;
      } else if (err.request) {
        message = "Network error - please check your connection";
      } else {
        message = err.message || message;
      }
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(aiResponse);
      setCopyStatus("Copied!");
      setSnackbarOpen(true);
      setTimeout(() => setCopyStatus("Copy to Clipboard"), 2000);
    } catch (err) {
      setCopyStatus("Failed to copy");
      console.error("Copy failed:", err);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        bgcolor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1300,
        backdropFilter: "blur(3px)"
      }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 4,
            position: "relative",
            width: "90vw",
            maxWidth: "700px",
            maxHeight: "90vh",
            overflow: "auto"
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
            ✉️ AI Email Assistant
          </Typography>

          <form onSubmit={handleSubmitEmail}>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="email-tone-label">Email Tone</InputLabel>
              <Select
                labelId="email-tone-label"
                value={emailTone}
                label="Email Tone"
                onChange={(e) => setEmailTone(e.target.value)}
                disabled={isLoading}
              >
                {EMAIL_TONES.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              multiline
              minRows={6}
              maxRows={10}
              variant="outlined"
              label="Type or paste your email here..."
              value={emailInput}
              onChange={(e) => {
                setEmailInput(e.target.value);
                setError(null);
              }}
              disabled={isLoading}
              sx={{ mb: 3 }}
              inputProps={{ "aria-label": "Email content input" }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isLoading || !emailInput.trim()}
              fullWidth
              sx={{ py: 1.5, mb: 2, fontWeight: "bold", fontSize: "1rem" }}
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isLoading ? "Generating..." : "Get AI Response"}
            </Button>
          </form>

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {aiResponse && (
            <Box mt={4}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
                AI Response
              </Typography>
              <TextField
                fullWidth
                multiline
                minRows={8}
                maxRows={12}
                variant="outlined"
                value={aiResponse}
                InputProps={{
                  readOnly: true,
                  sx: { fontFamily: "monospace", whiteSpace: "pre-wrap" }
                }}
                sx={{ mb: 2 }}
              />
              <Button
                variant="outlined"
                onClick={handleCopyToClipboard}
                fullWidth
                startIcon={<ContentCopyIcon />}
                disabled={!aiResponse}
                sx={{ fontWeight: "bold" }}
              >
                {copyStatus}
              </Button>
            </Box>
          )}
        </Paper>
      </motion.div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Copied to clipboard!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
};

export default EmailAssistantPopup;
