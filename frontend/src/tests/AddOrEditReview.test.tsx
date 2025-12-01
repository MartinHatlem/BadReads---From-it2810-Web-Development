import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { AddOrEditReviewBox } from "../components/AddOrEditReview";
import type { Review } from "../utils/reviewInterface";

let loadingFlag = false;
const mockMutation = vi.fn();

vi.mock("@apollo/client/react", () => ({
  useMutation: () => [mockMutation, { loading: loadingFlag }],
}));

type AuthUser = { id: number; name?: string; email?: string } | null;

let mockAuthState: { currentUser: AuthUser; isLoggedIn: boolean } = {
  currentUser: null,
  isLoggedIn: false,
};

vi.mock("../hooks/useAuth", () => ({
  useAuth: () => mockAuthState,
}));

beforeEach(() => {
  loadingFlag = false;
  mockMutation.mockReset();
  mockAuthState = { currentUser: null, isLoggedIn: false };
  cleanup();
});

afterEach(() => {
  vi.clearAllMocks();
  cleanup();
});

describe("AddOrEditReview tests", () => {
  const noopReviewHandler =
    vi.fn<(newReview: Review, newAvg: number) => void>();

  it("shows login prompt when user is not logged in", () => {
    mockAuthState = { currentUser: null, isLoggedIn: false };

    render(
      <AddOrEditReviewBox
        bookId={1}
        numberOfReviews={0}
        averageRating={0}
        onReviewAdded={noopReviewHandler}
        onReviewUpdated={noopReviewHandler}
        reviewAlreadyAdded={false}
      />,
    );

    expect(
      screen.getByText(/Log in to add your own review/i),
    ).toBeInTheDocument();
  });

  it("shows info text when user already added a review", () => {
    mockAuthState = {
      currentUser: { id: 1, name: "Test User", email: "test@mail.com" },
      isLoggedIn: true,
    };

    render(
      <AddOrEditReviewBox
        bookId={1}
        numberOfReviews={1}
        averageRating={4}
        onReviewAdded={noopReviewHandler}
        onReviewUpdated={noopReviewHandler}
        reviewAlreadyAdded={true}
      />,
    );

    expect(
      screen.getByText(/You have added a review for this book\./i),
    ).toBeInTheDocument();
  });

  it("renders form when user is logged in and submit button is initially disabled", () => {
    mockAuthState = {
      currentUser: { id: 1, name: "Test User", email: "test@mail.com" },
      isLoggedIn: true,
    };

    render(
      <AddOrEditReviewBox
        bookId={1}
        numberOfReviews={0}
        averageRating={0}
        onReviewAdded={noopReviewHandler}
        onReviewUpdated={noopReviewHandler}
        reviewAlreadyAdded={false}
      />,
    );

    expect(screen.getByText(/Add your review/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Comment/i)).toBeInTheDocument();

    const submitButton = screen.getByRole("button", {
      name: /Publish review/i,
    });

    expect(submitButton).toBeDisabled();
  });

  it("shows loading state on button when mutation's loading is true", () => {
    mockAuthState = {
      currentUser: { id: 1, name: "Test User", email: "test@mail.com" },
      isLoggedIn: true,
    };
    loadingFlag = true;

    render(
      <AddOrEditReviewBox
        bookId={5}
        numberOfReviews={0}
        averageRating={0}
        onReviewAdded={noopReviewHandler}
        onReviewUpdated={noopReviewHandler}
        reviewAlreadyAdded={false}
      />,
    );

    const submitButton = screen.getByRole("button", {
      name: /Submitting\.\.\./i,
    });

    expect(submitButton).toBeInTheDocument();
  });
});
