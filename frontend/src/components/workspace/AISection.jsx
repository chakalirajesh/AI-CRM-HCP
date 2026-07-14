import { useState } from "react";

import api from "../../services/api";

import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  CircularProgress,
  Paper,
} from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useAI } from "../../context/AIContext";

function AISection() {
  const [prompt, setPrompt] = useState("");
  const { setAIData } = useAI();
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);

      const response = await api.post("/ai/chat", {
        message: prompt,
      });

      setAIData(response.data.response);
      console.log("AISection:", response.data.response);

      setSummary(response.data.response.summary);
    } catch (error) {
      console.error(error);
      setSummary("Unable to generate AI summary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}

      <Box display="flex" alignItems="center" gap={2}>
        <SmartToyIcon
          sx={{
            color: "#2563EB",
            fontSize: 34,
          }}
        />

        <Typography variant="h5" fontWeight={700}>
          AI Assistant
        </Typography>
      </Box>

      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Log interaction details and generate AI insights.
      </Typography>

      <Divider sx={{ my: 3 }} />

      {/* AI Response */}

      <Typography variant="h6" fontWeight={700}>
        AI Response
      </Typography>

      <Paper
        elevation={0}
        sx={{
          mt: 2,
          p: 2,
          minHeight: 150,
          bgcolor: "#F8FAFC",
          border: "1px solid #E5E7EB",
        }}
      >
        <Typography color="text.secondary">
          {summary || "No AI response yet."}
        </Typography>
      </Paper>

      <Divider sx={{ my: 3 }} />

      {/* Prompt */}

      <Typography variant="h6" fontWeight={700} gutterBottom>
        Chat with AI Assistant
      </Typography>

      <TextField
        multiline
        rows={8}
        placeholder="Enter discussion details..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      {loading && (
        <Box textAlign="center" mt={2}>
          <CircularProgress />
        </Box>
      )}

      <Button
        fullWidth
        variant="contained"
        startIcon={<AutoAwesomeIcon />}
        onClick={generateSummary}
        sx={{
          mt: 3,
          height: 55,
          borderRadius: 3,
          fontWeight: 700,
          fontSize: 16,
        }}
      >
        Send to AI
      </Button>
    </Box>
  );
}

export default AISection;
