import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../components/Navbar";

vi.mock("../components/AuthButton", () => ({
  default: () => <div data-testid="auth-btn">AuthButton</div>,
}));

vi.mock("../components/ThemeToggle", () => ({
  default: () => <div data-testid="theme-toggle">ThemeToggle</div>,
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("Navbar tests", () => {
  it("renders brand name and links to homepage", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const brand = screen.getByText(/BadReads/i);
    expect(brand).toBeInTheDocument();
    expect(brand.closest("a")?.getAttribute("href")).toBe("/");
  });

  it("renders ThemeToggle and AuthButton components", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
    expect(screen.getByTestId("auth-btn")).toBeInTheDocument();
  });
});
