import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SortingDirectionButton from "../components/SortingDirectionButton";

describe("SortingDirectionButton tests", () => {
  it("renders a button with an accessible label", () => {
    render(
      <SortingDirectionButton
        isAscendingSorting={true}
        setIsAscendingSorting={() => {}}
      />,
    );

    const button = screen.getByRole("button", {
      name: /toggle sorting direction/i,
    });
    expect(button).toBeInTheDocument();
  });

  it("clicking the button toggles sorting direction from ascending to descending", () => {
    const toggleMock = vi.fn();

    render(
      <SortingDirectionButton
        isAscendingSorting={true}
        setIsAscendingSorting={toggleMock}
      />,
    );

    const button = screen.getByRole("button", {
      name: /toggle sorting direction/i,
    });
    fireEvent.click(button);

    expect(toggleMock).toHaveBeenCalledWith(false);
  });

  it("clicking the button toggles sorting direction from descending to ascending", () => {
    const toggleMock = vi.fn();

    const { rerender } = render(
      <SortingDirectionButton
        isAscendingSorting={true}
        setIsAscendingSorting={toggleMock}
      />,
    );

    const button = screen.getByRole("button", {
      name: /toggle sorting direction/i,
    });

    fireEvent.click(button);
    expect(toggleMock).toHaveBeenCalledWith(false);

    rerender(
      <SortingDirectionButton
        isAscendingSorting={false}
        setIsAscendingSorting={toggleMock}
      />,
    );

    fireEvent.click(button);
    expect(toggleMock).toHaveBeenCalledWith(true);
  });
});
