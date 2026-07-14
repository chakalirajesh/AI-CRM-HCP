import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Badge,
  TextField,
  InputAdornment,
} from "@mui/material";

import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import NotificationsIcon from "@mui/icons-material/Notifications";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Header() {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "#FFFFFF",
        color: "#1E293B",
        borderBottom: "1px solid #E5E7EB",
        zIndex: 1300,
      }}
    >
      <Toolbar sx={{ height: 72 }}>

        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#2563EB",
              width: 48,
              height: 48,
              mr: 2,
            }}
          >
            <LocalHospitalIcon />
          </Avatar>

          <Box>
            <Typography
              variant="h6"
              fontWeight="bold"
            >
              AI First CRM
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              Healthcare Professional Management
            </Typography>
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* Search */}
        <TextField
          size="small"
          placeholder="Search..."
          sx={{
            width: 280,
            mr: 3,
            bgcolor: "#F8FAFC",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Refresh */}
        <IconButton
          sx={{
            mr: 1,
            "&:hover": {
              bgcolor: "#EEF2FF",
            },
          }}
        >
          <RefreshIcon />
        </IconButton>

        {/* Notifications */}
        <IconButton
          sx={{
            mr: 2,
            "&:hover": {
              bgcolor: "#EEF2FF",
            },
          }}
        >
          <Badge
            badgeContent={3}
            color="error"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* User */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "#2563EB",
              width: 42,
              height: 42,
            }}
          >
            R
          </Avatar>

          <Box sx={{ ml: 1 }}>
            <Typography
              fontWeight="bold"
              fontSize={14}
            >
              Rajesh
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
            >
              Admin
            </Typography>
          </Box>

          <KeyboardArrowDownIcon
            sx={{
              ml: 1,
              color: "#64748B",
            }}
          />
        </Box>

      </Toolbar>
    </AppBar>
  );
}

export default Header;