import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function BackToTop() {
  const trigger = useScrollTrigger({
    threshold: 200, //show after 200px
    disableHysteresis: true,
  });

  const handleClick = () => {
    // scroll to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Zoom in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: (t) => t.zIndex.fab,
        }}
      >
        <Fab
          sx={{ bgcolor: "var(--accent)" }}
          size="medium"
          aria-label="Back to top"
        >
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Zoom>
  );
}
