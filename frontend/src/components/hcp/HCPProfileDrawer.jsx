import {
  Drawer,
  Box,
  Typography,
  Divider,
  Avatar,
  Button,
  Chip,
  Stack,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import EventIcon from "@mui/icons-material/Event";
import EditIcon from "@mui/icons-material/Edit";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

function HCPProfileDrawer({ open, onClose, hcp }) {
  if (!hcp) return null;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 420,
          p: 3,
        }}
      >
        {/* Header */}

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight="bold">
            HCP Profile
          </Typography>

          <Button onClick={onClose} minWidth="auto">
            <CloseIcon />
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Doctor */}

        <Stack spacing={2} alignItems="center">
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: "#2563EB",
            }}
          >
            <LocalHospitalIcon fontSize="large" />
          </Avatar>

          <Typography variant="h5" fontWeight="bold">
            {hcp.name}
          </Typography>

          <Chip color="primary" label={hcp.specialization || "Cardiologist"} />

          <Typography color="text.secondary">
            {hcp.hospital || "Apollo Hospital"}
          </Typography>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Details */}

        <Typography fontWeight="bold">Email</Typography>

        <Typography color="text.secondary">
          {hcp.email || "doctor@email.com"}
        </Typography>

        <Box mt={2} />

        <Typography fontWeight="bold">Phone</Typography>

        <Typography color="text.secondary">
          {hcp.phone || "+91 9876543210"}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography fontWeight="bold">Last Interaction</Typography>

        <Typography color="text.secondary">Meeting • 14 Jul 2026</Typography>

        <Box mt={2} />

        <Typography fontWeight="bold">AI Summary</Typography>

        <Typography color="text.secondary">
          Positive discussion regarding diabetes therapy. Requested updated
          clinical study.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Stack direction="row" spacing={2}>
          <Button fullWidth variant="outlined" startIcon={<EditIcon />}>
            Edit
          </Button>

          <Button fullWidth variant="contained" startIcon={<EventIcon />}>
            Schedule
          </Button>
        </Stack>
      </Box>
    </Drawer>
  );
}

export default HCPProfileDrawer;
