import { Box, Typography } from "@mui/material";

import InteractionWorkspace from "../components/workspace/InteractionWorkspace";
import InteractionHistory from "../components/InteractionHistory";

function InteractionPage() {
  return (
    <>
      {/* <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          HCP Interactions
        </Typography>

        <Typography color="text.secondary">
          Record, manage and review healthcare professional interactions.
        </Typography>
      </Box> */}

      <InteractionWorkspace />

      <Box sx={{ mt: 4 }}>
        <InteractionHistory />
      </Box>
    </>
  );
}

export default InteractionPage;
