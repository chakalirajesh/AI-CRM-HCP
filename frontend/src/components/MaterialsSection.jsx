import { Box, Typography, Button, Divider } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function MaterialsSection() {
  return (
    <Box
      sx={{
        border: "1px solid #E5E7EB",
        borderRadius: 2,
        mt: 2,
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography fontWeight={600}>Materials Shared</Typography>

        <Button variant="contained" size="small" startIcon={<AddIcon />}>
          Search/Add
        </Button>
      </Box>

      <Divider />

      <Box sx={{ p: 3 }}>
        <Typography color="text.secondary">No materials added.</Typography>
      </Box>
    </Box>
  );
}

export default MaterialsSection;
