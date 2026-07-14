import { Box } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import HCPManagementPage from "./pages/HCPManagementPage";
import InteractionPage from "./pages/InteractionPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";

import { useState } from "react";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F4F7FC",
      }}
    >
      <Header />

      <Box sx={{ display: "flex" }}>
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            marginLeft: sidebarOpen ? "250px" : "80px",
            marginTop: "72px",
            padding: 3,
            transition: "all .3s",
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />

            <Route path="/hcp" element={<HCPManagementPage />} />

            <Route path="/interactions" element={<InteractionPage />} />

            <Route path="/reports" element={<ReportsPage />} />

            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
