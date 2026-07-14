import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  TextField,
  Box,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import EditHCPDialog from "./EditHCPDialog";
import DeleteHCPDialog from "./DeleteHCPDialog";

import { useDispatch, useSelector } from "react-redux";
import { setHCPs } from "../../redux/hcpSlice";

function HCPTable() {
  const dispatch = useDispatch();

  const hcps = useSelector((state) => state.hcp.hcps);

  const [search, setSearch] = useState("");

  const [editOpen, setEditOpen] = useState(false);
  const [selectedHCP, setSelectedHCP] = useState(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteHCP, setDeleteHCP] = useState(null);

  useEffect(() => {
    loadHCPs();
  }, []);

  const loadHCPs = async () => {
    try {
      const response = await api.get("/hcp/");
      dispatch(setHCPs(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (hcp) => {
    setSelectedHCP(hcp);
    setEditOpen(true);
  };

  const openDeleteDialog = (hcp) => {
    setDeleteHCP(hcp);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/hcp/${deleteHCP.id}`);

      setDeleteOpen(false);
      setDeleteHCP(null);

      loadHCPs();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  const handleView = (hcp) => {
    console.log("View HCP:", hcp);
  };

  const filtered = hcps.filter((hcp) =>
    hcp.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <Paper sx={{ p: 3, borderRadius: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h6" fontWeight="bold">
            Healthcare Professionals
          </Typography>

          <TextField
            size="small"
            placeholder="Search HCP..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1 }} />,
            }}
          />
        </Box>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Name</b>
              </TableCell>
              <TableCell>
                <b>Specialization</b>
              </TableCell>
              <TableCell>
                <b>Hospital</b>
              </TableCell>
              <TableCell>
                <b>Status</b>
              </TableCell>
              <TableCell align="center">
                <b>Actions</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.map((hcp) => (
              <TableRow key={hcp.id} hover>
                <TableCell>{hcp.name}</TableCell>
                <TableCell>{hcp.specialization}</TableCell>
                <TableCell>{hcp.hospital}</TableCell>

                <TableCell>
                  <Chip label="Active" color="success" size="small" />
                </TableCell>

                <TableCell align="center">
                  <IconButton color="primary" onClick={() => handleView(hcp)}>
                    <VisibilityIcon />
                  </IconButton>

                  <IconButton color="primary" onClick={() => handleEdit(hcp)}>
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => openDeleteDialog(hcp)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <EditHCPDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        hcp={selectedHCP}
        onUpdated={loadHCPs}
      />

      <DeleteHCPDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onDelete={handleDelete}
        hcp={deleteHCP}
      />
    </>
  );
}

export default HCPTable;
