import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

function DeleteHCPDialog({ open, onClose, onDelete, hcp }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Delete Healthcare Professional</DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete
          <b> {hcp?.name}</b>?
        </Typography>

        <Typography color="error" sx={{ mt: 2 }}>
          This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>

        <Button color="error" variant="contained" onClick={onDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteHCPDialog;
