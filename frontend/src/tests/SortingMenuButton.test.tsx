import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SortingMenuButton from "../components/SortingMenuButton";
import { SORTING_CATEGORIES } from "../utils/sortingInterface";

describe("SortingMenuButton tests", () => {
  const mockSetChosenCategory = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  it("renders button with current category text", () => {
    render(
      <SortingMenuButton
        chosenCategory="title"
        setChosenCategory={mockSetChosenCategory}
      />,
    );

    const button = screen.getByRole("button", {
      name: /open sorting menu/i,
    });
    expect(button).toBeInTheDocument();

    expect(screen.getByText(/Sort by: Title/i)).toBeInTheDocument();
  });

  it("opens the menu when button is clicked", () => {
    render(
      <SortingMenuButton
        chosenCategory="title"
        setChosenCategory={mockSetChosenCategory}
      />,
    );

    const button = screen.getByRole("button", {
      name: /open sorting menu/i,
    });
    fireEvent.click(button);

    expect(screen.getByText("Publication Year")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Average Rating")).toBeInTheDocument();
  });

  it("calls setChosenCategory and updates sessionStorage when an option is selected", () => {
    render(
      <SortingMenuButton
        chosenCategory="title"
        setChosenCategory={mockSetChosenCategory}
      />,
    );

    const button = screen.getByRole("button", {
      name: /open sorting menu/i,
    });
    fireEvent.click(button);

    const option = screen.getByText("Publication Year");
    fireEvent.click(option);

    expect(mockSetChosenCategory).toHaveBeenCalledWith("publicationYear");

    const stored = sessionStorage.getItem("sorting_category");
    expect(SORTING_CATEGORIES).toContain(stored);
  });
});
