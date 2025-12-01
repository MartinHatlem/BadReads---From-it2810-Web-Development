import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

interface SortingDirectionButtonProps {
  isAscendingSorting: boolean;
  setIsAscendingSorting: (value: boolean) => void;
}

export default function SortingDirectionButton({
  isAscendingSorting,
  setIsAscendingSorting,
}: SortingDirectionButtonProps) {
  const handleClick = () => {
    setIsAscendingSorting(!isAscendingSorting);
  };

  const tooltip = isAscendingSorting
    ? "Sorting ascending — click to toggle"
    : "Sorting descending — click to toggle";

  return (
    <Tooltip title={tooltip} arrow>
      <IconButton
        onClick={handleClick}
        aria-label="Toggle sorting direction"
        sx={{
          borderRadius: "50%",
          width: 40,
          height: 40,
          backgroundColor: "transparent",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          "&:hover": {
            backgroundColor: "transparent",
            boxShadow: "0 6px 18px rgba(0, 0, 0, 0.22)",
            transform: "translateY(-2px)",
          },
          color: "var(--text)",
        }}
      >
        {isAscendingSorting ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
      </IconButton>
    </Tooltip>
  );
}
