import { describe, it, expect, vi, afterEach } from "vitest";
import type { Mock } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import BackToTop from "../components/BackToTopButton";

vi.mock("@mui/material/useScrollTrigger", () => ({
  __esModule: true,
  default: vi.fn(),
}));

import useScrollTrigger from "@mui/material/useScrollTrigger";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("BackToTopButton tests", () => {
  it("is hidden initially (trigger = false)", () => {
    (useScrollTrigger as Mock).mockReturnValue(false);

    render(<BackToTop />);

    const button = screen.queryByRole("button", { name: /back to top/i });
    expect(button).not.toBeInTheDocument();
  });

  it("shows the button when scroll trigger becomes true", () => {
    (useScrollTrigger as Mock).mockReturnValue(true);

    render(<BackToTop />);

    const button = screen.getByRole("button", { name: /back to top/i });
    expect(button).toBeInTheDocument();
  });

  it("scrolls to top when clicked", () => {
    (useScrollTrigger as Mock).mockReturnValue(true);

    const scrollSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});

    render(<BackToTop />);

    fireEvent.click(screen.getByRole("button", { name: /back to top/i }));

    expect(scrollSpy).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });

    scrollSpy.mockRestore();
  });
});
