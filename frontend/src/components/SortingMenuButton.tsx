import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { SORTING_CATEGORIES } from "../utils/sortingInterface";
import StyledButton from "./StyledButton";

interface SortingMenuButtonProps {
  // State handled by Home in order to notify BookCardOverview of filter changes
  chosenCategory: string;
  setChosenCategory: (category: string) => void;
}

const DISPLAY_NAMES: Record<string, string> = {
  title: "Title",
  publicationYear: "Publication Year",
  averageRating: "Average Rating",
};

export default function SortingMenuButton({
  chosenCategory,
  setChosenCategory,
}: SortingMenuButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (category?: string) => {
    if (category) {
      setSortingCategory(category);
    }
    setAnchorEl(null);
  };

  function setSortingCategory(category: string) {
    setChosenCategory(category);
    sessionStorage.setItem("sorting_category", category);
    // window.dispatchEvent(new Event("sortingChanged")); // notify BookCardOverview to re-render books
  }

  const sortingMenu = () => {
    return (
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        slotProps={{
          list: {
            "aria-labelledby": "basic-button",
          },
          paper: {
            elevation: 6,
            sx: {
              mt: 1,
              minWidth: 220,
              borderRadius: 2,
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text)",
              overflow: "hidden",

              "& .MuiMenuItem-root": {
                gap: 1.25,
                py: 1,
              },
              "& .MuiMenuItem-root.Mui-selected": {
                bgcolor: "action.selected",
                "&:hover": { bgcolor: "action.hover" },
              },
            },
          },
        }}
      >
        {SORTING_CATEGORIES.map((category) => (
          <MenuItem key={category} onClick={() => handleClose(category)}>
            {DISPLAY_NAMES[category] ?? category}
          </MenuItem>
        ))}
      </Menu>
    );
  };

  return (
    <>
      <StyledButton
        open={open}
        handleClick={handleClick}
        text={`Sort by: ${DISPLAY_NAMES[chosenCategory]}`}
        ariaLabel="Open sorting menu"
      />
      {sortingMenu()}
    </>
  );
}
