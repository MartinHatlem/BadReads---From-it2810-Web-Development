import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { ReviewPerBook } from "../components/ReviewPerBook";
import type { Review } from "../utils/reviewInterface";
import type { User } from "../utils/userInterface";

vi.mock("../hooks/useAuth", () => ({
  useAuth: () => ({
    currentUser: { id: 1, name: "Alice", email: "alice@mail.com" }, // id is now a number
  }),
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("ReviewPerBook tests", () => {
  const mockReviews: Review[] = [
    {
      id: 1,
      bookId: 30,
      rating: 5,
      comment: "Amazing!",
      userId: 1,
      dateCreated: "2024-01-15",
    },
    {
      id: 2,
      bookId: 40,
      rating: 3,
      comment: "Decent read.",
      userId: 2,
      dateCreated: "2024-02-10",
    },
  ];

  const users: User[] = [
    { id: 1, name: "Alice", email: "alice@mail.com" },
    { id: 2, name: "Bob", email: "bob@mail.com" },
  ];

  const noop = () => {};

  it("renders the correct amount of reviews", () => {
    render(
      <ReviewPerBook
        reviews={mockReviews}
        users={users}
        isEditingReview={false}
        setIsEditingReview={noop}
        currentUserId={1}
      />,
    );

    expect(screen.getAllByTestId("review-item")).toHaveLength(2);
  });

  it("shows username, comment and rating for each review", () => {
    render(
      <ReviewPerBook
        reviews={mockReviews}
        users={users}
        isEditingReview={false}
        setIsEditingReview={noop}
        currentUserId={1}
      />,
    );

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText(/Amazing!/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Rating: 5 out of 5")).toBeInTheDocument();

    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText(/Decent read\.?/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Rating: 3 out of 5")).toBeInTheDocument();
  });

  it("renders fallback when there are no reviews", () => {
    render(
      <ReviewPerBook
        reviews={[]}
        users={users}
        isEditingReview={false}
        setIsEditingReview={noop}
        currentUserId={1}
      />,
    );

    expect(
      screen.getByText(/No ratings found for this book/i),
    ).toBeInTheDocument();
  });
});
