import { Box, Typography, Paper, Grid, Button } from "@mui/material";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import TableChartIcon from "@mui/icons-material/TableChart";
import AssessmentIcon from "@mui/icons-material/Assessment";

function ReportsPage() {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold">
        Reports
      </Typography>

      <Typography color="text.secondary" mb={4}>
        Generate and export healthcare reports.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <AssessmentIcon color="primary" sx={{ fontSize: 45 }} />

            <Typography variant="h6" mt={2}>
              Interaction Report
            </Typography>

            <Typography color="text.secondary" mb={2}>
              Export interaction history.
            </Typography>

            <Button fullWidth variant="contained">
              Generate
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <PictureAsPdfIcon color="error" sx={{ fontSize: 45 }} />

            <Typography variant="h6" mt={2}>
              Export PDF
            </Typography>

            <Typography color="text.secondary" mb={2}>
              Download professional PDF report.
            </Typography>

            <Button fullWidth variant="contained">
              Export PDF
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <TableChartIcon color="success" sx={{ fontSize: 45 }} />

            <Typography variant="h6" mt={2}>
              Export Excel
            </Typography>

            <Typography color="text.secondary" mb={2}>
              Download Excel spreadsheet.
            </Typography>

            <Button fullWidth variant="contained">
              Export Excel
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ReportsPage;
