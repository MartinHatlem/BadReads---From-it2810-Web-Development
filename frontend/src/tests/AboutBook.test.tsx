import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { AboutBook } from "../components/AboutBook";

vi.mock("../assets/PlaceholderImage.png", () => ({
  default: "placeholder-image.png",
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

const bookWithNoImage = {
  id: 1,
  title: "No Image Book",
  author: "Alice Author",
  publicationYear: 2021,
  genre: "Drama",
  description: "A story about things.",
  image: "",
};

const bookWithImage = {
  id: 2,
  title: "Has Image Book",
  author: "Bob Writer",
  publicationYear: 2020,
  genre: "Sci-fi",
  description: "Futuristic tale.",
  image: "https://example.com/book-cover.jpg",
};

describe("AboutBook tests", () => {
  it("renders title, author, year, genre and description", () => {
    render(<AboutBook book={bookWithNoImage} />);

    expect(screen.getByText("No Image Book")).toBeInTheDocument();
    expect(screen.getByText(/Written by:/)).toBeInTheDocument();
    expect(screen.getByText(/Alice Author/)).toBeInTheDocument();
    expect(screen.getByText(/Publication year:/)).toBeInTheDocument();
    expect(screen.getByText(/2021/)).toBeInTheDocument();
    expect(screen.getByText(/Genre:/)).toBeInTheDocument();
    expect(screen.getByText(/Drama/)).toBeInTheDocument();
    expect(screen.getByText(/Summary/)).toBeInTheDocument();
    expect(screen.getByText(/A story about things\./i)).toBeInTheDocument();
  });

  it("uses placeholder image when no image URL provided", () => {
    render(<AboutBook book={bookWithNoImage} />);
    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toContain("placeholder-image.png");
    expect(img).toHaveAttribute(
      "alt",
      expect.stringContaining("No Image Book"),
    );
  });

  it("uses provided image URL when present", () => {
    render(<AboutBook book={bookWithImage} />);
    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.getAttribute("src")).toContain(
      "https://example.com/book-cover.jpg",
    );
    expect(img).toHaveAttribute(
      "alt",
      expect.stringContaining("Has Image Book"),
    );
  });
});
