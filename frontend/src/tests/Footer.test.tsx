import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "../components/Footer";

afterEach(() => {
  cleanup();
});

describe("Footer tests", () => {
  it("renders heading and descriptive text", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(/This website is created for project-purposes/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /On this website you can see a number of selected books/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders a homepage link that points to /", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );

    const link = screen.getByRole("link", { name: /home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
