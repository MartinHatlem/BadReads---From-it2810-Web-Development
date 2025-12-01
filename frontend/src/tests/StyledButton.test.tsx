import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import StyledButton from "../components/StyledButton";

describe("StyledButton tests", () => {
  it("renders button with provided text", () => {
    render(<StyledButton handleClick={() => {}} text="Click me" />);

    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });

  it("calls handleClick when clicked", () => {
    const handleClick = vi.fn();
    render(<StyledButton handleClick={handleClick} text="Press" />);

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies accessibility attributes when open is true", () => {
    render(
      <StyledButton
        open={true}
        handleClick={() => {}}
        ariaLabel="menu button"
        ariaControlsOnOpen="menu-id"
        ariaHasPopup={true}
        text="Menu"
      />,
    );

    const button = screen.getByRole("button", { name: /menu button/i });

    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(button).toHaveAttribute("aria-controls", "menu-id");
    expect(button).toHaveAttribute("aria-haspopup", "true");
  });

  it("does not set aria-controls or expanded when open is false", () => {
    render(
      <StyledButton
        open={false}
        handleClick={() => {}}
        ariaControlsOnOpen="menu-id"
        ariaHasPopup={true}
        text="Menu"
      />,
    );

    const button = screen.getByRole("button", { name: /menu/i });

    expect(button).not.toHaveAttribute("aria-expanded");
    expect(button).not.toHaveAttribute("aria-controls");
    expect(button).toHaveAttribute("aria-haspopup", "true");
  });
});
