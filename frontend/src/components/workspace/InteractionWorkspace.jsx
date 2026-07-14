import { Grid, Paper } from "@mui/material";

import FormSection from "./FormSection";
import AISection from "./AISection";

function InteractionWorkspace() {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #E5E7EB",
        bgcolor: "#fff",
        overflow: "hidden",
      }}
    >
      <Grid container>
        {/* LEFT - Form */}

        <Grid
          item
          xs={12}
          lg={8}
          sx={{
            borderRight: {
              xs: "none",
              lg: "1px solid #E5E7EB",
            },
          }}
        >
          <FormSection />
        </Grid>

        {/* RIGHT - AI */}

        <Grid item xs={12} lg={4}>
          <AISection />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default InteractionWorkspace;
