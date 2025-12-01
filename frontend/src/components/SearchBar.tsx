import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import { useEffect, useState } from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
}: SearchBarProps) {
  const [rawSearchTerm, setRawSearchTerm] = useState(searchTerm); // Before debouncing

  // debounce search input (wait 500ms after typing stops)
  useEffect(() => {
    const timer = setTimeout(() => setSearchTerm(rawSearchTerm), 500);
    return () => clearTimeout(timer);
  }, [rawSearchTerm, setSearchTerm]);
  return (
    <TextField
      id="book-search"
      name="search"
      fullWidth
      placeholder="Search by title, author, or genre"
      aria-label="Search by title, author, or genre"
      variant="outlined"
      value={rawSearchTerm}
      onChange={(e) => setRawSearchTerm(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon sx={{ color: "var(--text-secondary)" }} />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {searchTerm && (
              <IconButton
                aria-label="Clear search"
                onClick={() => setRawSearchTerm("")}
                edge="end"
                size="small"
                sx={{ color: "var(--text-secondary)" }}
              >
                <ClearIcon />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
      sx={{
        mb: 4,
        "& .MuiOutlinedInput-root": {
          //Same height as styledButtons
          height: 40,
          borderRadius: 10,
          backgroundColor: "var(--medium-gray)",
          color: "var(--text-secondary)",
          "& fieldset": {
            borderColor: "transparent",
            borderRadius: 10,
          },
          "&:hover fieldset": {
            borderColor: "transparent",
            borderWidth: 1.5,
          },
          "&.Mui-focused fieldset": {
            borderColor: "var(--accent)",
            borderWidth: 2,
          },
        },
        "& .MuiInputLabel-root": {
          color: "var(--text-secondary)",
          fontWeight: 500,
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: "var(--text)",
        },
        "& .MuiInputBase-input": {
          color: "var(--text)",
        },
      }}
    />
  );
}
