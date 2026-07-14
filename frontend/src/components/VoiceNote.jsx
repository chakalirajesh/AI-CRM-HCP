import { Box, Link } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";

function VoiceNote() {
  return (
    <Box sx={{ py: 1 }}>
      <Link
        href="#"
        underline="hover"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontWeight: 500,
          cursor: "pointer",
        }}
      >
        <MicIcon fontSize="small" />
        Summarize from Voice Note (Requires Consent)
      </Link>
    </Box>
  );
}

export default VoiceNote;