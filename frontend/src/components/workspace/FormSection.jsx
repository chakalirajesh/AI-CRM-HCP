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

import EventIcon from "@mui/icons-material/Event";
import SaveIcon from "@mui/icons-material/Save";

import { useEffect, useState } from "react";

import api from "../../services/api";
import { getHCPs } from "../../services/hcpService";

import VoiceNote from "../VoiceNote";
import MaterialsSection from "../MaterialsSection";

function FormSection() {
  const [hcps, setHcps] = useState([]);

  const [hcpId, setHcpId] = useState("");
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
      alert("Please fill all required fields.");
      return;
    }

    try {
      await api.post("/interaction/", {
        hcp_id: Number(hcpId),
        interaction_type: interactionType,
        notes: notes,
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
