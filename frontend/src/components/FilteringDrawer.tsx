import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Slider from "@mui/material/Slider";
import RadioButtonUncheckedRoundedIcon from "@mui/icons-material/RadioButtonUncheckedRounded";
import RadioButtonCheckedRoundedIcon from "@mui/icons-material/RadioButtonCheckedRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { GENRES, type Genre } from "../utils/genres";

interface FilteringDrawerProps {
  open: boolean;
  onClose: () => void;
  genre: string;
  setGenre: (genre: string) => void;

  minRating: number | null;
  maxRating: number | null;
  setMinRating: (value: number | null) => void;
  setMaxRating: (value: number | null) => void;
}

export default function FilteringDrawer({
  open,
  onClose,
  genre,
  setGenre,
  minRating,
  maxRating,
  setMinRating,
  setMaxRating,
}: FilteringDrawerProps) {
  const handleRatingChange = (_: Event, value: number | number[]) => {
    const [min, max] = value as number[];
    setMinRating(min);
    setMaxRating(max);
  };

  const genreListButton = (text: Genre) => {
    return (
      <ListItem
        key={text}
        disablePadding
        sx={{
          bgcolor: text === genre ? "var(--medium-gray)" : "inherit",
          borderRadius: 1,
          mb: 0.5,
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            transform: "translateX(1px)",
          },
        }}
      >
        <ListItemButton
          aria-label={text}
          onClick={() => (genre === text ? setGenre("") : setGenre(text))}
        >
          <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
            {/* Change icon to show which genre is selected */}
            {text === genre ? (
              <RadioButtonCheckedRoundedIcon />
            ) : (
              <RadioButtonUncheckedRoundedIcon />
            )}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    );
  };

  const resetFilterButton = () => {
    return (
      <ListItem
        key={"Clear all filters"}
        sx={{
          borderRadius: 1,
          mb: 0.5,
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            transform: "translateX(1px)",
          },
        }}
        disablePadding
      >
        <ListItemButton
          aria-label={"Clear all filters"}
          onClick={() => {
            setGenre("");
            setMinRating(0);
            setMaxRating(5);
          }}
        >
          <ListItemIcon sx={{ color: "inherit", minWidth: 36 }}>
            <ClearRoundedIcon />
          </ListItemIcon>
          <ListItemText
            primary="Clear all filters"
            primaryTypographyProps={{ fontStyle: "italic" }}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  const GenreFilterBox = (
    <Box
      role="presentation"
      data-testid="filtering-drawer-presentation"
      sx={{
        width: 280,
        backgroundColor: "var(--bg-secondary)",
      }}
    >
      <List dense sx={{ color: "var(--text)", padding: 1 }}>
        {/* GENRE FILTER */}
        <Box
          component="h1"
          sx={{
            fontSize: 18,
            fontWeight: 600,
            mb: 1,
            px: 2,
            mt: 2,
            opacity: 0.8,
          }}
        >
          Filter by genre
        </Box>
        {GENRES.map((g) => genreListButton(g))}
      </List>
    </Box>
  );
  const RatingFilterBox = (
    <Box
      sx={{
        px: 2,
        py: 3,
        mt: 2,
        borderTop: "1px solid var(--text)",
        opacity: 0.8,
      }}
    >
      <Box component="h1" sx={{ fontSize: 18, fontWeight: 600, mb: 1 }}>
        Filter by rating
      </Box>

      <Slider
        value={[minRating ?? 0, maxRating ?? 5]}
        onChange={handleRatingChange}
        valueLabelDisplay="auto"
        min={0}
        max={5}
        step={0.5}
        sx={{
          color: "var(--accent)",
        }}
      />

      <Box sx={{ mt: 1, fontSize: 14 }}>
        {minRating} ★ – {maxRating} ★
      </Box>
    </Box>
  );

  return (
    <Drawer
      aria-label="Genre and rating filtering menu"
      slotProps={{
        paper: {
          sx: {
            bgcolor: "var(--bg-secondary)",
            color: "var(--text)",
            width: 280,
            boxShadow:
              "0 6px 24px rgba(0,0,0,.5), 0 1px 0 rgba(255,255,255,.04)",
          },
        },
      }}
      open={open}
      onClose={onClose}
    >
      {GenreFilterBox}
      {RatingFilterBox}
      {genre || minRating !== 0 || maxRating !== 5 ? resetFilterButton() : null}
    </Drawer>
  );
}
