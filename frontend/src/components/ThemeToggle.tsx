import { LuMoon, LuSun } from "react-icons/lu";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useMemo } from "react";
import useTheme from "../hooks/useTheme";

type ThemeKey = "light" | "dark" | "system";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useTheme();

  const prefersDark = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }, []);

  const effective: ThemeKey =
    theme === "system" ? (prefersDark ? "dark" : "light") : theme;
  const isDark = effective === "dark";

  const handleClick = () => {
    setTheme(isDark ? "light" : "dark");
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setTheme("system");
  };

  const tooltip =
    theme === "system"
      ? `Following system (${isDark ? "Dark" : "Light"}) — click to toggle, right-click for System`
      : `Switch to ${isDark ? "Light" : "Dark"} (right-click for System)`;

  return (
    <Tooltip title={tooltip} arrow>
      <IconButton
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        aria-pressed={isDark ? "true" : "false"}
        sx={{
          borderRadius: "50%",
          width: 40,
          height: 40,
          backgroundColor: "transparent",
          boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
          "&:hover": {
            backgroundColor: "rgba(0,0,0,0.04)",
            boxShadow: "0 6px 16px rgba(0,0,0,0.2)",
          },
          color: "inherit",
          "&:focus-visible": {
            outline: "2px solid var(--accent)",
            outlineOffset: "3px",
          },
        }}
      >
        {isDark ? (
          <LuMoon size={20} data-testid="moon-icon" />
        ) : (
          <LuSun size={20} data-testid="sun-icon" />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggle;
