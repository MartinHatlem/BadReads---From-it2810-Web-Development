import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import BookCardOverview from "../components/BookCardOverview";
import SortingMenuButton from "../components/SortingMenuButton";
import FilteringDrawer from "../components/FilteringDrawer";
import BackToTopButton from "../components/BackToTopButton";
import {
  SORTING_CATEGORIES,
  type SortingColumn,
} from "../utils/sortingInterface";
import SortingDirectionButton from "../components/SortingDirectionButton";
import StyledButton from "../components/StyledButton";
import SearchBar from "../components/SearchBar";
import ChosenFilterBubble from "../components/ChosenFilterBubble";

function HomePage() {
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);

  // Load and store category books are sorted by
  const loadedSortingCategory =
    (sessionStorage.getItem("sorting_category") as SortingColumn) || null;
  const [chosenSortingCategory, setChosenSortingCategory] =
    useState<SortingColumn>(
      loadedSortingCategory &&
        SORTING_CATEGORIES.includes(loadedSortingCategory as SortingColumn)
        ? (loadedSortingCategory as SortingColumn)
        : "averageRating",
    );

  // Genre filter
  const [genreFilter, setGenreFilter] = useState<string>(
    sessionStorage.getItem("genre_filter") || "",
  );
  function setGlobalGenreFilter(genre: string) {
    setGenreFilter(genre);
    sessionStorage.setItem("genre_filter", genre);
  }

  // Rating filter
  const loadedMinRating = sessionStorage.getItem("min_rating");
  const loadedMaxRating = sessionStorage.getItem("max_rating");

  const [minRating, setMinRating] = useState<number | null>(
    loadedMinRating ? Number(loadedMinRating) : 0,
  );

  const [maxRating, setMaxRating] = useState<number | null>(
    loadedMaxRating ? Number(loadedMaxRating) : 5,
  );

  function setGlobalMinRating(value: number | null) {
    setMinRating(value);
    sessionStorage.setItem("min_rating", String(value));
  }

  function setGlobalMaxRating(value: number | null) {
    setMaxRating(value);
    sessionStorage.setItem("max_rating", String(value));
  }

  // Direction of sorting (Ascending vs descending)
  const loadedDirection = sessionStorage.getItem("sorting_direction") as
    | "ASC"
    | "DESC"
    | null;
  const [isAscendingSorting, setIsAscendingSorting] = useState<boolean>(
    loadedDirection === "ASC", // default to DESC so user sees highest rating
  );
  function setGlobalFilterIsAscending(isAscending: boolean) {
    setIsAscendingSorting(isAscending);
    sessionStorage.setItem("sorting_direction", isAscending ? "ASC" : "DESC");
  }

  const [searchTerm, setSearchTerm] = useState("");

  //Added to try to fix the bug of updating rating in OverviewCard.
  const [triggerRefetch, setTriggerRefetch] = useState(0);

  function handleReviewChanged() {
    setTriggerRefetch((prev) => prev + 1);
  }

  return (
    <section>
      <Container maxWidth="lg" sx={{ marginTop: 5, marginBottom: 8 }}>
        {/* Section for search and filter controls */}
        <section aria-labelledby="controls-heading" role="search">
          <h2 id="controls-heading" style={{ display: "none" }}>
            Search and filtering controls
          </h2>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              rowGap: 2,
              mb: -2,
              width: "100%",
              "@media (max-width:700px)": {
                flexDirection: "column",
                alignItems: "stretch",
              },
            }}
          >
            {/* Box keeping Filters and Sorting buttons together */}
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start", //Keep buttons to the left
                gap: 1,

                "@media (max-width:700px)": {
                  order: 1, // Ensure this section is over search bar on small screens
                },
              }}
            >
              <StyledButton
                ariaLabel="Open filtering menu"
                aria-expanded={openFilterDrawer}
                handleClick={() => setOpenFilterDrawer(true)}
                text="Filters"
              />

              {/* Sorting controls */}
              <SortingMenuButton
                chosenCategory={chosenSortingCategory}
                setChosenCategory={setChosenSortingCategory}
              />
              <SortingDirectionButton
                isAscendingSorting={isAscendingSorting}
                setIsAscendingSorting={setGlobalFilterIsAscending}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                width: "300px",
                alignItems: "center",

                "@media (max-width:700px)": {
                  width: "100%",
                  order: 2,
                },
              }}
            >
              <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
            </Box>
          </Box>

          {/* Box to group filter bubbles on a separate line */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              mb: 2,
              transform: "ease-in",
              transition: "all 0.3s ease",
            }}
          >
            {genreFilter && genreFilter !== "" && (
              <ChosenFilterBubble
                filterType="Genre"
                filterValue={genreFilter}
                onRemove={() => setGlobalGenreFilter("")}
              />
            )}
            {/* Add this after implementing rating filter */}
            {((minRating !== null && minRating !== 0) ||
              (maxRating !== null && maxRating !== 5)) && (
              <ChosenFilterBubble
                filterType="Rating"
                filterValue={`${minRating} - ${maxRating}`}
                onRemove={() => {
                  setGlobalMinRating(0);
                  setGlobalMaxRating(5);
                }}
              />
            )}
          </Box>
        </section>

        {/* Section for the list of books */}
        <section aria-labelledby="books-heading" aria-live="polite">
          <h2 id="books-heading" style={{ display: "none" }}>
            Book results
          </h2>
          {/* Grid of BookCards — automatically reacts to search, sorting and filtering */}
          <BookCardOverview
            searchTerm={searchTerm}
            genre={genreFilter}
            sortingCategory={chosenSortingCategory}
            sortingDirection={isAscendingSorting ? "ASC" : "DESC"}
            minRating={minRating}
            maxRating={maxRating}
            triggerRefetch={triggerRefetch}
            onReviewChanged={handleReviewChanged}
          />
        </section>
      </Container>

      {/* Drawer showing filter options */}
      <FilteringDrawer
        open={openFilterDrawer}
        onClose={() => setOpenFilterDrawer(false)}
        genre={genreFilter}
        setGenre={setGlobalGenreFilter}
        minRating={minRating}
        maxRating={maxRating}
        setMinRating={setGlobalMinRating}
        setMaxRating={setGlobalMaxRating}
      />

      <BackToTopButton />
    </section>
  );
}

export default HomePage;
