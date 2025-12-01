import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "../components/ThemeToggle";

const setTheme = vi.fn();
vi.mock("../hooks/useTheme", () => ({
  default: () => ["light", setTheme] as const,
}));

beforeAll(() => {
  if (!window.matchMedia) {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  }
});

describe("ThemeToggle tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders toggle button", () => {
    render(<ThemeToggle />);
    expect(
      screen.getByRole("button", { name: /switch to/i }),
    ).toBeInTheDocument();
  });

  it("toggles theme from light to dark on click", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: /switch to/i }));
    expect(setTheme).toHaveBeenCalledWith("dark");
  });

  it("sets system mode on right click", () => {
    render(<ThemeToggle />);
    fireEvent.contextMenu(screen.getByRole("button", { name: /switch to/i }));
    expect(setTheme).toHaveBeenCalledWith("system");
  });

  it("shows a sun icon in light/effective-light mode", () => {
    render(<ThemeToggle />);
    expect(screen.getByTestId("sun-icon")).toBeInTheDocument();
  });

  it("shows a moon icon in dark/effective-dark mode", async () => {
    vi.resetModules();
    vi.doMock("../hooks/useTheme", () => ({
      default: () => ["dark", setTheme] as const,
    }));

    const { default: ThemeToggleDark } = await import(
      "../components/ThemeToggle"
    );

    render(<ThemeToggleDark />);

    expect(screen.getByTestId("moon-icon")).toBeInTheDocument();

    vi.doUnmock("../hooks/useTheme");
    vi.resetModules();
  });
});
