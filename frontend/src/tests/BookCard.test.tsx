import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BookCard } from "../components/BookCard";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../assets/PlaceholderImage.png", () => ({
  default: "placeholder-image.png",
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

const mockBook = {
  id: 123,
  title: "Test Book",
  author: "Jon Doe",
  publicationYear: 2022,
  genre: "Mystery",
  image: "",
};

describe("BookCard tests", () => {
  it("renders title, author-year and genre", () => {
    const { container } = render(<BookCard book={mockBook} />);

    expect(screen.getByText("Test Book")).toBeInTheDocument();
    expect(screen.getByText("Jon Doe - 2022")).toBeInTheDocument();
    expect(screen.getByText("Mystery")).toBeInTheDocument();

    expect(container.firstChild).toBeTruthy();
  });

  it("calls navigate with correct path when clicked", () => {
    const { container } = render(<BookCard book={mockBook} />);

    fireEvent.click(container.firstChild as Element);

    expect(mockNavigate).toHaveBeenCalledWith("/project2/aboutBook/123");
  });

  it("displays placeholder image when no image URL provided", async () => {
    const bookNoImage = { ...mockBook, image: undefined };

    render(<BookCard book={bookNoImage} />);

    const alt = `Cover image for the book ${bookNoImage.title}`;
    const img = (await screen.findByAltText(
      new RegExp(alt, "i"),
    )) as HTMLImageElement;

    expect(img).toBeInTheDocument();
    expect(img.src).toContain("placeholder-image.png");
  });
});
