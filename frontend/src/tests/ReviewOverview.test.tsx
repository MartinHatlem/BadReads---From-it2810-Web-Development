import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import type { Book } from "../utils/BookInterface";
import type { Review } from "../utils/reviewInterface";
import { ReviewOverview } from "../components/ReviewOverview";

vi.mock("../components/ReviewPerBook", () => ({
  ReviewPerBook: ({ reviews }: { reviews: Review[] }) => (
    <div data-testid="review-per-book">{`reviews:${reviews.length}`}</div>
  ),
}));

vi.mock("../components/AddOrEditReview", () => ({
  AddOrEditReviewBox: ({ bookId }: { bookId: number }) => (
    <div data-testid="add-review">{`add-review:${bookId}`}</div>
  ),
}));

vi.mock("@apollo/client/react", () => ({
  useQuery: vi.fn().mockReturnValue({
    data: { allUsers: [] },
    loading: false,
    error: undefined,
  }),
}));

vi.mock("../hooks/useAuth", () => ({
  useAuth: () => ({
    currentUser: { id: 2 },
  }),
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("ReviewOverview tests", () => {
  const mockBook: Book = {
    id: 10,
    title: "Test Book",
    author: "Author Placeholder",
    publicationYear: 2024,
    genre: "Drama",
    description: "Test description",
    image: "",
    averageRating: 3.5,
    reviews: [
      {
        id: 1,
        bookId: 10,
        userId: 2,
        comment: "Great!",
        rating: 4,
      } as Review,
      {
        id: 2,
        bookId: 10,
        userId: 3,
        comment: "Good",
        rating: 3,
      } as Review,
    ],
  };

  it("renders the title and review count", () => {
    render(<ReviewOverview book={mockBook} />);

    expect(screen.getByText(/Reviews of Test Book/i)).toBeInTheDocument();
    expect(screen.getByText(/\(2\)/)).toBeInTheDocument();
  });

  it("passes reviews array to ReviewPerBook", () => {
    render(<ReviewOverview book={mockBook} />);

    expect(screen.getByTestId("review-per-book")).toHaveTextContent(
      "reviews:2",
    );
  });

  it("renders AddOrEditReviewBox (mocked as add-review) with the correct bookId", () => {
    render(<ReviewOverview book={mockBook} />);

    expect(screen.getByTestId("add-review")).toHaveTextContent("add-review:10");
  });

  it("handles books with no reviews", () => {
    const noReviewsBook: Book = { ...mockBook, reviews: [], averageRating: 0 };
    render(<ReviewOverview book={noReviewsBook} />);

    expect(screen.getByText(/\(0\)/)).toBeInTheDocument();
    expect(screen.getByTestId("review-per-book")).toHaveTextContent(
      "reviews:0",
    );
  });
});
