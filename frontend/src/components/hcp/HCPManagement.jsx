import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

import HCPTable from "./HCPTable";
import AddHCPDialog from "./AddHCPDialog";

function HCPManagement() {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ mt: 4 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            HCP Management
          </Typography>

          <Typography color="text.secondary">
            Manage Healthcare Professionals
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add HCP
        </Button>
      </Box>

      <HCPTable />

      <AddHCPDialog open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}

export default HCPManagement;
