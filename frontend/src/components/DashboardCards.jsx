import { Grid, Paper, Typography, Box, Chip } from "@mui/material";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ForumIcon from "@mui/icons-material/Forum";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CloudDoneIcon from "@mui/icons-material/CloudDone";

const cards = [
  {
    title: "Total HCPs",
    value: "2",
    subtitle: "+1 this week",
    color: "#2563EB",
    icon: <PeopleAltIcon sx={{ fontSize: 34 }} />,
  },
  {
    title: "Interactions",
    value: "10",
    subtitle: "+4 today",
    color: "#16A34A",
    icon: <ForumIcon sx={{ fontSize: 34 }} />,
  },
  {
    title: "AI Status",
    value: "Online",
    subtitle: "Groq Connected",
    color: "#7C3AED",
    icon: <SmartToyIcon sx={{ fontSize: 34 }} />,
  },
  {
    title: "Backend",
    value: "Connected",
    subtitle: "FastAPI Running",
    color: "#EA580C",
    icon: <CloudDoneIcon sx={{ fontSize: 34 }} />,
  },
];

function DashboardCards() {
  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} lg={3} key={card.title}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid #E5E7EB",
              transition: ".25s",

              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 10px 25px rgba(0,0,0,.08)",
              },
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography color="text.secondary" fontSize={14}>
                  {card.title}
                </Typography>

                <Typography variant="h4" fontWeight="bold" mt={1}>
                  {card.value}
                </Typography>

                <Chip
                  label={card.subtitle}
                  size="small"
                  sx={{
                    mt: 2,
                    bgcolor: `${card.color}15`,
                    color: card.color,
                    fontWeight: 600,
                  }}
                />
              </Box>

              <Box
                sx={{
                  width: 62,
                  height: 62,
                  borderRadius: "50%",
                  bgcolor: `${card.color}15`,
                  color: card.color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {card.icon}
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default DashboardCards;
