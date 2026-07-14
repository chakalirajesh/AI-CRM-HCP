import { useState } from "react";
import api from "../services/api";

import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  CircularProgress,
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

function AIChat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);
      setResponse("");

      const res = await api.post("/ai/chat", {
        message: prompt,
      });
      console.log("AI Response:", res.data);
      setResponse(
        res.data.response || res.data.answer || "No response received.",
      );

      setPrompt("");
    } catch (error) {
      console.error(error);
      setResponse("Unable to connect to AI.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 4,
        height: "100%",
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        🤖 AI Assistant
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        AI-powered healthcare interaction assistant
      </Typography>

      {/* Welcome Message */}

      <Box display="flex" mb={3}>
        <Avatar
          sx={{
            bgcolor: "#2563EB",
            mr: 2,
          }}
        >
          <SmartToyIcon />
        </Avatar>

        <Paper
          sx={{
            p: 2,
            bgcolor: "#F8FAFC",
            flex: 1,
          }}
        >
          <Typography fontWeight="bold">Hello! 👋</Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            I'm your AI Healthcare Assistant.
            <br />
            Enter your interaction notes and I'll generate:
            <br />
            • Professional Summary
            <br />
            • Key Discussion Points
            <br />• Recommended Follow-up Actions
          </Typography>
        </Paper>
      </Box>

      {/* User Message */}

      {prompt && (
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Paper
            sx={{
              p: 2,
              bgcolor: "#2563EB",
              color: "#fff",
              maxWidth: "80%",
            }}
          >
            {prompt}
          </Paper>

          <Avatar
            sx={{
              ml: 2,
              bgcolor: "#22C55E",
            }}
          >
            <PersonIcon />
          </Avatar>
        </Box>
      )}

      {/* Loading */}

      {loading && (
        <Box display="flex" justifyContent="center" alignItems="center" my={3}>
          <CircularProgress size={28} />
        </Box>
      )}

      {/* AI Response */}

      {response && (
        <Box display="flex" mb={3}>
          <Avatar
            sx={{
              bgcolor: "#2563EB",
              mr: 2,
            }}
          >
            <SmartToyIcon />
          </Avatar>

          <Paper
            sx={{
              p: 2,
              bgcolor: "#F8FAFC",
              flex: 1,
            }}
          >
            <Typography>{response}</Typography>
          </Paper>
        </Box>
      )}

      {/* Input */}

      <TextField
        fullWidth
        multiline
        rows={5}
        label="Describe the interaction..."
        placeholder="Example: Met Dr. Kumar to discuss the new diabetes treatment..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <Button
        fullWidth
        variant="contained"
        startIcon={<AutoAwesomeIcon />}
        disabled={loading}
        sx={{
          mt: 2,
          py: 1.5,
          textTransform: "none",
          fontWeight: "bold",
        }}
        onClick={askAI}
      >
        {loading ? "Generating..." : "Generate AI Summary"}
      </Button>
    </Paper>
  );
}

export default AIChat;
