import {
  Drawer,
  Toolbar,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ForumIcon from "@mui/icons-material/Forum";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import { Link, useLocation } from "react-router-dom";
const drawerWidth = 250;
const collapsedWidth = 80;

const menus = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    path: "/",
  },
  {
    title: "HCP Management",
    icon: <PeopleIcon />,
    path: "/hcp",
  },
  {
    title: "Interactions",
    icon: <ForumIcon />,
    path: "/interactions",
  },
  // {
  //   title: "AI Assistant",
  //   icon: <SmartToyIcon />,
  //   path: "/interactions", // Change this when you create an AI page
  // },
  {
    title: "Reports",
    icon: <AssessmentIcon />,
    path: "/reports",
  },
  {
    title: "Settings",
    icon: <SettingsIcon />,
    path: "/settings",
  },
];
function Sidebar({ open, setOpen }) {
  const location = useLocation();
  return (
    <Drawer
      variant="permanent"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      sx={{
        width: open ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        transition: "all .3s ease",

        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : collapsedWidth,
          transition: "all .3s ease",
          overflowX: "hidden",
          boxSizing: "border-box",
          bgcolor: "#0F172A",
          color: "#fff",
          border: "none",
        },
      }}
    >
      <Toolbar />

      {/* Logo */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "flex-start" : "center",
          px: open ? 3 : 0,
          py: 3,
        }}
      >
        <LocalHospitalIcon
          sx={{
            fontSize: 40,
            color: "#3B82F6",
            mr: open ? 1.5 : 0,
          }}
        />

        {open && (
          <Box>
            <Typography variant="h6" fontWeight="bold">
              AI CRM
            </Typography>

            <Typography variant="caption" sx={{ color: "#94A3B8" }}>
              Enterprise Edition
            </Typography>
          </Box>
        )}
      </Box>

      <Divider sx={{ borderColor: "#1E293B" }} />

      {/* Menu */}

      <List sx={{ mt: 2 }}>
        {menus.map((item) => (
          <ListItemButton
            key={item.title}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              mx: 1,
              mb: 1,
              borderRadius: 2,
              justifyContent: open ? "initial" : "center",

              "&.Mui-selected": {
                bgcolor: "#2563EB",
                color: "#fff",
              },

              "&.Mui-selected:hover": {
                bgcolor: "#1D4ED8",
              },

              "&:hover": {
                bgcolor: "#1E293B",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "inherit",
                minWidth: open ? 42 : 0,
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>

            {open && (
              <ListItemText
                primary={item.title}
                primaryTypographyProps={{
                  fontSize: 15,
                  fontWeight: 500,
                }}
              />
            )}
          </ListItemButton>
        ))}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      {open && (
        <>
          <Divider sx={{ borderColor: "#1E293B" }} />

          <Box sx={{ p: 3 }}>
            <Typography variant="caption" color="#94A3B8">
              AI First CRM v1.0
            </Typography>

            <Typography variant="body2" color="#CBD5E1">
              Healthcare Platform
            </Typography>
          </Box>
        </>
      )}
    </Drawer>
  );
}

export default Sidebar;
