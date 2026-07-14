import { useEffect, useState } from "react";
import api from "../../services/api";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
} from "@mui/material";

function EditHCPDialog({ open, onClose, hcp, onUpdated }) {
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    hospital: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (hcp) {
      setForm({
        name: hcp.name || "",
        specialization: hcp.specialization || "",
        hospital: hcp.hospital || "",
        email: hcp.email || "",
        phone: hcp.phone || "",
      });
    }
  }, [hcp]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/hcp/${hcp.id}`, form);

      alert("HCP Updated Successfully");

      if (onUpdated) {
        onUpdated();
      }

      onClose();
    } catch (error) {
      console.error(error);
      alert("Update Failed");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Healthcare Professional</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Specialization"
              name="specialization"
              value={form.specialization}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Hospital"
              name="hospital"
              value={form.hospital}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button variant="contained" onClick={handleUpdate}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditHCPDialog;
