import AppBar from "@mui/material/AppBar";
import AuthButton from "./AuthButton";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "var(--nav)",
        boxShadow: "var(--nav-shadow)",
        backdropFilter: "saturate(160%) blur(6px)",
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <Toolbar sx={{ gap: 2 }}>
          {/* Brand */}
          <Link
            to="/"
            aria-label="Go to homepage"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              variant="h6"
              noWrap
              sx={{
                flexShrink: 0,
                fontWeight: 600,
                letterSpacing: 0.5,
                padding: 1.5,
              }}
            >
              BadReads
            </Typography>
          </Link>

          {/* Space between brand and actions */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Actions */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, ml: 1 }}>
            <ThemeToggle />
            <AuthButton />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
