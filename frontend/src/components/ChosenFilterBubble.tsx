import Button from "@mui/material/Button";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

interface ChosenFilterBubbleProps {
  filterType: string;
  filterValue: string;
  onRemove: () => void;
}

export default function ChosenFilterBubble({
  filterType,
  filterValue,
  onRemove,
}: ChosenFilterBubbleProps) {
  return (
    <Button
      id="basic-button"
      type="button"
      aria-label={`Remove ${filterValue} ${filterType} filter`}
      onClick={onRemove}
      disableRipple
      sx={{
        // Allow internal text span to control ellipsis
        display: "inline-flex",
        alignItems: "center",
        maxWidth: { xs: 190, sm: 250, md: 300 },
        backgroundColor: "rgba(217, 255, 0, 0.08)",
        border: 1.5,
        borderColor: "transparent",
        borderRadius: 5,
        px: 2,
        height: 40,
        textTransform: "none",
        fontWeight: 600,
        fontSize: "0.9rem",
        color: "var(--text)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        transition: "all 0.2s ease",
        "&:hover": {
          "& .close-icon": { display: "none" },
          "& .cancel-icon": { display: "block" },
          backgroundColor: "transparent",
          boxShadow: "0 6px 18px rgba(0, 0, 0, 0.22)",
          transform: "translateY(-2px)",
        },
        "&:focus-visible": {
          outline: "2px solid var(--accent)",
          outlineOffset: "3px",
        },
      }}
    >
      {/* Wrapping text in a span ensures ellipsis at end, not start */}
      <span
        style={{
          display: "block",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          minWidth: 0,
          maxWidth: "100%",
        }}
      >
        {`${filterType}: ${filterValue}`}
      </span>
      <CloseRoundedIcon className="close-icon" sx={{ ml: 0.5 }} />
      <CancelRoundedIcon
        className="cancel-icon"
        sx={{ ml: 0.5, scale: 1.3, display: "none" }}
      />
    </Button>
  );
}
