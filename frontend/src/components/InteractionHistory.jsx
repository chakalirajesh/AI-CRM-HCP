import { useEffect, useState } from "react";
import api from "../services/api";

import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  TextField,
  Box,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import HCPProfileDrawer from "./hcp/HCPProfileDrawer";

import { useDispatch, useSelector } from "react-redux";
import { setInteractions } from "../redux/interactionSlice";

function InteractionHistory() {
  const dispatch = useDispatch();

  const interactions = useSelector((state) => state.interaction.interactions);

  const [search, setSearch] = useState("");

  const [selectedHCP, setSelectedHCP] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    loadInteractions();
  }, []);

  const loadInteractions = async () => {
    try {
      const response = await api.get("/interaction/");
      dispatch(setInteractions(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleView = (interaction) => {
    setSelectedHCP(interaction);
    setDrawerOpen(true);
  };

  const filtered = interactions.filter((item) =>
    item.notes?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <Paper
        elevation={2}
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight={700}>
              Interaction History
            </Typography>

            <Typography color="text.secondary">
              Review previous HCP interactions
            </Typography>
          </Box>

          <TextField
            size="small"
            placeholder="Search interaction..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 280 }}
            InputProps={{
              startAdornment: (
                <SearchIcon
                  sx={{
                    mr: 1,
                    color: "#64748B",
                  }}
                />
              ),
            }}
          />
        </Box>

        <Table
          sx={{
            "& th": {
              bgcolor: "#F8FAFC",
              fontWeight: 700,
            },
            "& td": {
              py: 2,
            },
            "& tbody tr:hover": {
              bgcolor: "#F8FAFC",
            },
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <b>ID</b>
              </TableCell>

              <TableCell>
                <b>HCP ID</b>
              </TableCell>

              <TableCell>
                <b>Type</b>
              </TableCell>

              <TableCell>
                <b>Status</b>
              </TableCell>

              <TableCell>
                <b>Date</b>
              </TableCell>

              <TableCell align="center">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((item) => (
              <TableRow key={item.id} hover>
                <TableCell>{item.id}</TableCell>

                <TableCell>{item.hcp_id}</TableCell>

                <TableCell>{item.interaction_type}</TableCell>

                <TableCell>
                  <Chip
                    label="Completed"
                    color="success"
                    sx={{ fontWeight: 600 }}
                  />
                </TableCell>

                <TableCell>{item.created_at?.substring(0, 10)}</TableCell>

                <TableCell align="center">
                  <IconButton
                    onClick={() => handleView(item)}
                    sx={{
                      bgcolor: "#EEF2FF",
                      mr: 1,
                      "&:hover": {
                        bgcolor: "#DBEAFE",
                      },
                    }}
                  >
                    <VisibilityIcon color="primary" />
                  </IconButton>

                  <IconButton
                    sx={{
                      bgcolor: "#EFF6FF",
                      mr: 1,
                      "&:hover": {
                        bgcolor: "#DBEAFE",
                      },
                    }}
                  >
                    <EditIcon color="primary" />
                  </IconButton>

                  <IconButton
                    sx={{
                      bgcolor: "#FEF2F2",
                      "&:hover": {
                        bgcolor: "#FEE2E2",
                      },
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <HCPProfileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        hcp={selectedHCP}
      />
    </>
  );
}

export default InteractionHistory;
