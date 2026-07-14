import {
  Paper,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
  Divider,
  Chip,
  Box,
} from "@mui/material";

import EventIcon from "@mui/icons-material/Event";
import SaveIcon from "@mui/icons-material/Save";

import { useState, useEffect } from "react";

import api from "../services/api";
import { getHCPs } from "../services/hcpService";

import VoiceNote from "./VoiceNote";
import MaterialsSection from "./MaterialsSection";

function InteractionForm() {
  const [hcpId, setHcpId] = useState("");
  const [hcps, setHcps] = useState([]);
  const [interactionType, setInteractionType] = useState("Meeting");
  const [interactionDate, setInteractionDate] = useState("");
  const [interactionTime, setInteractionTime] = useState("");
  const [attendees, setAttendees] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadHCPs();
  }, []);

  const loadHCPs = async () => {
    try {
      const data = await getHCPs();
      setHcps(data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveInteraction = async () => {
    if (!hcpId || !notes) {
      alert("Please select an HCP and enter discussion notes.");
      return;
    }

    try {
      await api.post("/interaction/", {
        hcp_id: Number(hcpId),
        interaction_type: interactionType,
        notes: notes,
      });

      alert("✅ Interaction Saved Successfully!");

      setHcpId("");
      setInteractionType("Meeting");
      setInteractionDate("");
      setInteractionTime("");
      setAttendees("");
      setNotes("");
    } catch (error) {
      console.error(error);
      alert("❌ Failed to save interaction.");
    }
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 4,
        borderRadius: 4,
        bgcolor: "#fff",
        border: "1px solid #E5E7EB",
      }}
    >
      {/* Header */}

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="bold">
          Log HCP Interaction
        </Typography>

        <Chip label="Healthcare CRM" color="primary" variant="outlined" />
      </Box>

      <Divider sx={{ my: 3 }} />

      {/* Section */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          bgcolor: "#F8FAFC",
          p: 2,
          borderRadius: 2,
          mb: 4,
        }}
      >
        <EventIcon color="primary" />

        <Box>
          <Typography variant="h6" fontWeight="bold">
            Interaction Details
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Capture details of the healthcare professional meeting.
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <Chip label="Required" size="small" color="primary" />
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            size="small"
            label="Select HCP"
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

        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            size="small"
            label="Interaction Type"
            value={interactionType}
            onChange={(e) => setInteractionType(e.target.value)}
          >
            <MenuItem value="Meeting">Meeting</MenuItem>
            <MenuItem value="Call">Call</MenuItem>
            <MenuItem value="Email">Email</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size="small"
            type="date"
            label="Date"
            value={interactionDate}
            onChange={(e) => setInteractionDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            size="small"
            type="time"
            label="Time"
            value={interactionTime}
            onChange={(e) => setInteractionTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            label="Attendees"
            placeholder="Enter attendees"
            value={attendees}
            onChange={(e) => setAttendees(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={7}
            label="Topics Discussed"
            placeholder="Enter key discussion points..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ mb: 2 }} />
          <VoiceNote />
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ mb: 2 }} />

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Materials Shared / Samples Distributed
          </Typography>

          <MaterialsSection />
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            size="large"
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={saveInteraction}
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: 2,
              fontWeight: "bold",
              fontSize: "16px",
              textTransform: "none",
            }}
          >
            Save Interaction
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default InteractionForm;
