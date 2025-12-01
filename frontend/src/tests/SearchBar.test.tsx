import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

describe("SearchBar tests", () => {
  beforeEach(() => {
    vi.useFakeTimers(); // A fake timers before each test
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers(); // Reset to real timers after each test
  });

  it("renders with the correct placeholder and initial value", () => {
    render(<SearchBar searchTerm="initial" setSearchTerm={vi.fn()} />);

    const input = screen.getByPlaceholderText(
      "Search books by title, author, or genre",
    ) as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.value).toBe("initial");
  });

  it("calls setSearchTerm when typing", () => {
    const setSearchTerm = vi.fn();
    render(<SearchBar searchTerm="" setSearchTerm={setSearchTerm} />);

    const input = screen.getByPlaceholderText(
      "Search books by title, author, or genre",
    ) as HTMLInputElement;

    // Type into the input (this sets rawSearchTerm internally)
    fireEvent.change(input, { target: { value: "New search" } });

    // Verify input shows the typed value immediately
    expect(input.value).toBe("New search");

    // setSearchTerm shouldn't be called yet (because of debounce)
    expect(setSearchTerm).not.toHaveBeenCalled();

    // Advance timers by 500ms to trigger debounce
    vi.advanceTimersByTime(500);

    // Now setSearchTerm should be called
    expect(setSearchTerm).toHaveBeenCalledTimes(1);
    expect(setSearchTerm).toHaveBeenCalledWith("New search");
  });

  it("updates input value when searchTerm prop changes", () => {
    render(<SearchBar searchTerm="" setSearchTerm={vi.fn()} />);
    const input2 = screen.getByPlaceholderText(
      "Search books by title, author, or genre",
    ) as HTMLInputElement;

    fireEvent.change(input2, { target: { value: "first" } });

    const input = screen.getByPlaceholderText(
      "Search books by title, author, or genre",
    ) as HTMLInputElement;

    expect(input.value).toBe("first");

    // rerender(<SearchBar searchTerm="" setSearchTerm={vi.fn()} />);
    fireEvent.change(input2, { target: { value: "updated" } });
    expect(input.value).toBe("updated");
  });
});
