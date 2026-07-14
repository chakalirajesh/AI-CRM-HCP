import { useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Stack,
  Divider,
} from "@mui/material";

import DashboardCards from "../components/DashboardCards";

import AddIcon from "@mui/icons-material/PersonAdd";
import ForumIcon from "@mui/icons-material/Forum";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import api from "../services/api";

import { useDispatch } from "react-redux";
import { setDashboardData } from "../redux/dashboardSlice";

function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const hcpResponse = await api.get("/hcp/");
      const interactionResponse = await api.get("/interaction/");

      console.log("HCP Response:", hcpResponse.data);
      console.log("Interaction Response:", interactionResponse.data);

      dispatch(
        setDashboardData({
          totalHCPs: hcpResponse.data.length,
          totalInteractions: interactionResponse.data.length,
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Header */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Dashboard
          </Typography>

          <Typography color="text.secondary">
            Welcome back! Here's an overview of your Healthcare CRM.
          </Typography>
        </Box>

        <TrendingUpIcon
          sx={{
            fontSize: 45,
            color: "#2563EB",
          }}
        />
      </Box>

      {/* Dashboard Cards */}
      <DashboardCards />

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              height: "100%",
            }}
          >
            <Typography variant="h6" fontWeight="bold" mb={3}>
              Quick Actions
            </Typography>

            <Stack spacing={2}>
              <Button fullWidth variant="contained" startIcon={<AddIcon />}>
                Add Healthcare Professional
              </Button>

              <Button fullWidth variant="outlined" startIcon={<ForumIcon />}>
                Log New Interaction
              </Button>
            </Stack>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid #E5E7EB",
              height: "100%",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Recent Activity
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography color="text.secondary">
              ✅ New Healthcare Professional added
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 2 }}>
              💬 Interaction recorded successfully
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 2 }}>
              🤖 AI summary generated
            </Typography>

            <Typography color="text.secondary" sx={{ mt: 2 }}>
              📅 Follow-up scheduled
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
