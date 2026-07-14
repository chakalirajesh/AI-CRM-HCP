import {
  Box,
  Typography,
  Paper,
  Switch,
  FormControlLabel,
  Divider,
  Avatar,
  Stack,
} from "@mui/material";

import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";

function SettingsPage() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold">
        Settings
      </Typography>

      <Typography color="text.secondary" mb={4}>
        Manage your application preferences.
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 3,
          border: "1px solid #E5E7EB",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              bgcolor: "#2563EB",
              width: 60,
              height: 60,
            }}
          >
            <PersonIcon />
          </Avatar>

          <Box>
            <Typography variant="h6" fontWeight="bold">
              Admin User
            </Typography>

            <Typography color="text.secondary">
              AI CRM Healthcare Platform
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Enable AI Suggestions"
        />

        <FormControlLabel
          control={<Switch defaultChecked />}
          label="Enable Notifications"
        />

        <FormControlLabel control={<Switch />} label="Dark Mode" />

        <Divider sx={{ my: 3 }} />

        <Box display="flex" alignItems="center" gap={1}>
          <SettingsIcon color="primary" />

          <Typography color="text.secondary">Version 1.0.0</Typography>
        </Box>
      </Paper>
    </Box>
  );
}

export default SettingsPage;
