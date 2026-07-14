import {
  Box,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import { Radio, RadioGroup, FormControlLabel, FormLabel } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import SaveIcon from "@mui/icons-material/Save";

import { useEffect, useState } from "react";

import api from "../../services/api";
import { getHCPs } from "../../services/hcpService";

import VoiceNote from "../VoiceNote";
import MaterialsSection from "../MaterialsSection";

import { useAI } from "../../context/AIContext";

function FormSection() {
  const [hcps, setHcps] = useState([]);

  const [sentiment, setSentiment] = useState("Neutral");
  const [outcomes, setOutcomes] = useState("");
  const [followUpActions, setFollowUpActions] = useState("");
  const [aiFollowUps, setAiFollowUps] = useState([]);

  const { aiData } = useAI();
  const [hcpId, setHcpId] = useState("");
  const [interactionType, setInteractionType] = useState("Meeting");
  const [interactionDate, setInteractionDate] = useState("");
  const [interactionTime, setInteractionTime] = useState("");
  const [attendees, setAttendees] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadHCPs();
  }, []);
  useEffect(() => {
    if (!aiData) return;
    const aiName = (aiData?.hcp_name || "")
      .toLowerCase()
      .replace("dr.", "")
      .replace("dr", "")
      .trim();

    const aiWords = aiName.split(" ");

    const hcp = hcps.find((item) => {
      if (!aiName) return false;

      const dbName = item.name
        .toLowerCase()
        .replace("dr.", "")
        .replace("dr", "")
        .trim();

      return aiWords.some((word) => dbName.includes(word));
    });

    if (hcp) {
      setHcpId(hcp.id);
    }

    if (aiData.interaction_type) {
      setInteractionType(aiData.interaction_type);
    }

    if (aiData.date && /^\d{4}-\d{2}-\d{2}$/.test(aiData.date)) {
      setInteractionDate(aiData.date);
    }

    if (aiData.time && /^\d{2}:\d{2}$/.test(aiData.time)) {
      setInteractionTime(aiData.time);
    }

    if (aiData.attendees) {
      setAttendees(aiData.attendees);
    } else if (hcp) {
      setAttendees(hcp.name);
    }

    if (aiData.notes) {
      setNotes(aiData.notes);
    }
    if (aiData.follow_up) {
      setAiFollowUps(
        aiData.follow_up.split("\n").filter((item) => item.trim() !== ""),
      );
    }
  }, [aiData, hcps]);
  const loadHCPs = async () => {
    try {
      const data = await getHCPs();
      setHcps(data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveInteraction = async () => {
    if (!hcpId || !interactionType || !interactionDate || !notes.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      await api.post("/interaction/", {
        hcp_id: Number(hcpId),
        interaction_type: interactionType,
        notes,
        ai_summary: aiData?.summary,
        next_action: aiData?.next_action,
      });

      alert("Interaction Saved Successfully");

      setHcpId("");
      setInteractionType("Meeting");
      setInteractionDate("");
      setInteractionTime("");
      setAttendees("");
      setNotes("");
    } catch (error) {
      console.error(error);
      alert("Failed to save interaction");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="bold">
          Log HCP Interaction
        </Typography>

        <Chip label="Healthcare CRM" color="primary" variant="outlined" />
      </Box>

      <Divider sx={{ my: 3 }} />

      <Box
        sx={{
          bgcolor: "#F8FAFC",
          borderRadius: 2,
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 4,
        }}
      >
        <EventIcon color="primary" />

        <Box>
          <Typography fontWeight="bold">Interaction Details</Typography>

          <Typography variant="body2" color="text.secondary">
            Record your meeting with the healthcare professional.
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* HCP Name */}

        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="HCP Name"
            placeholder="Search or select HCP..."
            value={hcpId}
            onChange={(e) => setHcpId(e.target.value)}
          >
            {hcps.map((hcp) => (
              <MenuItem key={hcp.id} value={hcp.id}>
                {hcp.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Interaction Type */}

        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            label="Interaction Type"
            value={interactionType}
            onChange={(e) => setInteractionType(e.target.value)}
          >
            <MenuItem value="Meeting">Meeting</MenuItem>
            <MenuItem value="Call">Call</MenuItem>
            <MenuItem value="Email">Email</MenuItem>
            <MenuItem value="Conference">Conference</MenuItem>
          </TextField>
        </Grid>
        {/* Date */}

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Date"
            type="date"
            value={interactionDate}
            onChange={(e) => setInteractionDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        {/* Time */}

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Time"
            type="time"
            value={interactionTime}
            onChange={(e) => setInteractionTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        {/* Attendees */}

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Attendees"
            placeholder="Enter attendees"
            value={attendees}
            onChange={(e) => setAttendees(e.target.value)}
          />
        </Grid>

        {/* Discussion */}

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={7}
            label="Topics Discussed"
            placeholder="Enter discussion details..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Grid>
        {/* Voice Note */}
        <Grid item xs={12}>
          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" fontWeight={700} gutterBottom>
            Voice Note
          </Typography>

          <VoiceNote />
        </Grid>
        {/* Materials Shared */}

        <Grid item xs={12}>
          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" fontWeight={700} gutterBottom>
            Materials Shared / Samples Distributed
          </Typography>

          <MaterialsSection />
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ my: 3 }} />

          <FormLabel
            sx={{
              fontWeight: 700,
              mb: 2,
              display: "block",
            }}
          >
            Observed / Inferred HCP Sentiment
          </FormLabel>

          <RadioGroup
            row
            value={sentiment}
            onChange={(e) => setSentiment(e.target.value)}
          >
            <FormControlLabel
              value="Positive"
              control={<Radio />}
              label="Positive"
            />

            <FormControlLabel
              value="Neutral"
              control={<Radio />}
              label="Neutral"
            />

            <FormControlLabel
              value="Negative"
              control={<Radio />}
              label="Negative"
            />
          </RadioGroup>
        </Grid>
        <Grid item xs={12}>
          <FormLabel
            sx={{
              fontWeight: 700,
              mb: 1,
              display: "block",
            }}
          >
            Outcomes
          </FormLabel>

          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Key outcomes or agreements..."
            value={outcomes}
            onChange={(e) => setOutcomes(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <FormLabel
            sx={{
              fontWeight: 700,
              mb: 1,
              display: "block",
            }}
          >
            Follow-up Actions
          </FormLabel>

          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Enter follow-up actions..."
            value={followUpActions}
            onChange={(e) => setFollowUpActions(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" fontWeight={700} gutterBottom>
            AI Suggested Follow-ups
          </Typography>

          <Box
            sx={{
              bgcolor: "#F8FAFC",
              border: "1px solid #E5E7EB",
              borderRadius: 2,
              p: 2,
            }}
          >
            {aiFollowUps.length > 0 ? (
              aiFollowUps.map((item, index) => (
                <Typography key={index} sx={{ mb: 1 }}>
                  • {item}
                </Typography>
              ))
            ) : (
              <Typography color="text.secondary">
                No AI follow-up suggestions available.
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" fontWeight={700} gutterBottom>
            AI Insights
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "#F8FAFC",
                  border: "1px solid #E5E7EB",
                  borderRadius: 2,
                }}
              >
                <Typography fontWeight={700}>Interaction Summary</Typography>

                <Typography color="text.secondary">
                  {aiData?.summary || "No summary generated"}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "#F8FAFC",
                  border: "1px solid #E5E7EB",
                  borderRadius: 2,
                }}
              >
                <Typography fontWeight={700}>Next Best Action</Typography>

                <Typography color="text.secondary">
                  {aiData?.next_action || "No recommendation"}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "#F8FAFC",
                  border: "1px solid #E5E7EB",
                  borderRadius: 2,
                }}
              >
                <Typography fontWeight={700}>Follow-up</Typography>

                <Typography color="text.secondary">
                  {aiData?.follow_up || "No follow-up"}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        {/* Save Button */}

        <Grid item xs={12}>
          <Divider sx={{ my: 4 }} />

          <Button
            fullWidth
            variant="contained"
            size="large"
            startIcon={<SaveIcon />}
            onClick={saveInteraction}
            sx={{
              height: 56,
              borderRadius: 3,
              fontSize: 16,
              fontWeight: 700,
              bgcolor: "#2563EB",

              "&:hover": {
                bgcolor: "#1D4ED8",
              },
            }}
          >
            Save Interaction
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FormSection;
