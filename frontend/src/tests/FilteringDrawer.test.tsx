import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import FilteringDrawer from "../components/FilteringDrawer";
import { GENRES } from "../utils/genres";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

let onClose: ReturnType<typeof vi.fn<() => void>>;
let setGenre: ReturnType<typeof vi.fn<(genre: string) => void>>;
let setMinRating: ReturnType<typeof vi.fn<(value: number | null) => void>>;
let setMaxRating: ReturnType<typeof vi.fn<(value: number | null) => void>>;

beforeEach(() => {
  onClose = vi.fn<() => void>();
  setGenre = vi.fn<(genre: string) => void>();
  setMinRating = vi.fn<(value: number | null) => void>();
  setMaxRating = vi.fn<(value: number | null) => void>();
});

describe("FilteringDrawer tests", () => {
  it("renders the list of genres and the heading", () => {
    render(
      <FilteringDrawer
        open={true}
        onClose={onClose}
        genre=""
        setGenre={setGenre}
        minRating={0}
        maxRating={5}
        setMinRating={setMinRating}
        setMaxRating={setMaxRating}
      />,
    );

    expect(screen.getByText(/Filter by genre/i)).toBeInTheDocument();

    for (const g of GENRES) {
      expect(screen.getByLabelText(g)).toBeInTheDocument();
    }
  });

  it("calls setGenre when a genre button is clicked", () => {
    const onClose = vi.fn();
    const setGenre = vi.fn();

    render(
      <FilteringDrawer
        open={true}
        onClose={onClose}
        genre=""
        setGenre={setGenre}
        minRating={0}
        maxRating={5}
        setMinRating={setMinRating}
        setMaxRating={setMaxRating}
      />,
    );

    const firstGenre = GENRES[0];
    const btn = screen.getByLabelText(firstGenre);
    fireEvent.click(btn);

    expect(setGenre).toHaveBeenCalledWith(firstGenre);

    const presentation = screen.getByTestId("filtering-drawer-presentation");
    fireEvent.click(presentation);
  });

  it("Closes the drawer when clicking outside the drawer", () => {
    render(
      <FilteringDrawer
        open={true}
        onClose={onClose}
        genre=""
        setGenre={setGenre}
        minRating={0}
        maxRating={5}
        setMinRating={setMinRating}
        setMaxRating={setMaxRating}
      />,
    );

    const backdrop = document.querySelector(".MuiBackdrop-root");
    if (backdrop) {
      fireEvent.click(backdrop);
    } else {
      throw new Error("Backdrop not found");
    }

    expect(onClose).toHaveBeenCalled();
  });

  it("shows the 'Show all genres' reset button when a genre is selected and clicking it clears genre", () => {
    const onClose = vi.fn();
    const setGenre = vi.fn();

    render(
      <FilteringDrawer
        open={true}
        onClose={onClose}
        genre={GENRES[0]}
        setGenre={setGenre}
        minRating={0}
        maxRating={5}
        setMinRating={setMinRating}
        setMaxRating={setMaxRating}
      />,
    );

    const resetButton = screen.getByLabelText("Clear all filters");
    expect(resetButton).toBeInTheDocument();

    fireEvent.click(resetButton);
    expect(setGenre).toHaveBeenCalledWith("");
  });
});
