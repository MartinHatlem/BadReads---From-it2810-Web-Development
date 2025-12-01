import Button from "@mui/material/Button";

interface StyledButtonProps {
  open?: boolean;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  text?: React.ReactNode;
  ariaLabel?: string;
  ariaControlsOnOpen?: string;
  ariaHasPopup?: boolean;
}

export default function StyledButton({
  open,
  handleClick,
  text,
  ariaLabel,
  ariaControlsOnOpen,
  ariaHasPopup,
}: StyledButtonProps) {
  return (
    <Button
      id="basic-button"
      type="button"
      aria-label={ariaLabel}
      aria-controls={open ? ariaControlsOnOpen : undefined}
      aria-haspopup={ariaHasPopup ? "true" : undefined}
      aria-expanded={open ? "true" : undefined}
      onClick={handleClick}
      disableRipple
      sx={{
        whiteSpace: "nowrap",
        backgroundColor: "transparent",
        border: 1.5,
        borderColor: "var(--medium-gray)",
        borderRadius: 5,
        px: 2,
        py: 0.5,
        height: 40,
        textTransform: "none",
        fontWeight: 600,
        fontSize: "0.9rem",
        color: "var(--text)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        transition: "all 0.2s ease",
        "&:hover": {
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
      {text}
    </Button>
  );
}
