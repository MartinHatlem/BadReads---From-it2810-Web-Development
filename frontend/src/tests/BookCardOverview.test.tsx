import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import type { Book } from "../utils/BookInterface";
import BookCardOverview from "../components/BookCardOverview";

const fakePage1 = [
  {
    id: 1,
    title: "Book A",
    author: "A",
    publicationYear: 2020,
    genre: "X",
    description: "",
    image: "",
  },
  {
    id: 2,
    title: "Book B",
    author: "B",
    publicationYear: 2021,
    genre: "Y",
    description: "",
    image: "",
  },
];

const fakePage2 = [
  {
    id: 3,
    title: "Book C",
    author: "C",
    publicationYear: 2022,
    genre: "Z",
    description: "",
    image: "",
  },
];

const mockLazyQuery = vi.fn();

// --- UPDATED MOCK ---
vi.mock("@apollo/client/react", () => ({
  useLazyQuery: () => [
    mockLazyQuery.mockImplementation(async ({ variables }) => {
      const offset = variables?.offset || 0;

      // Return empty result when searching for "nohit"
      if (variables?.searchTerm === "nohit") {
        return Promise.resolve({ data: { allBooks: [] } });
      }

      if (offset === 0) {
        return Promise.resolve({ data: { allBooks: fakePage1 } });
      }
      return Promise.resolve({ data: { allBooks: fakePage2 } });
    }),
    { loading: false },
  ],
}));

vi.mock("../components/BookCard", () => ({
  BookCard: ({ book }: { book: Book }) => {
    return <div data-testid={`book-${book.id}`}>{book.title}</div>;
  },
}));

class MockIntersectionObserver {
  cb: IntersectionObserverCallback;
  constructor(cb: IntersectionObserverCallback) {
    this.cb = cb;
  }
  observe() {
    this.cb(
      [{ isIntersecting: true } as unknown as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
  disconnect() {}
  unobserve() {}
}

beforeEach(() => {
  globalThis.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;
});

afterEach(() => {
  vi.clearAllMocks();
  cleanup();
});

describe("BookCardOverview tests", () => {
  it("loads first page when intersection observer triggers and renders BookCards", async () => {
    render(<BookCardOverview />);

    expect(mockLazyQuery).toHaveBeenCalled();

    expect(await screen.findByText("Book A")).toBeInTheDocument();
    expect(screen.getByText("Book B")).toBeInTheDocument();
  });

  it("calls query again and replaces list when a prop (searchTerm) changes", async () => {
    const { rerender } = render(<BookCardOverview searchTerm="" />);

    expect(mockLazyQuery).toHaveBeenCalledTimes(1);
    expect(await screen.findByText("Book A")).toBeInTheDocument();

    rerender(<BookCardOverview searchTerm="new" />);

    await vi.waitFor(() => {
      expect(mockLazyQuery).toHaveBeenCalledTimes(2);
    });

    expect(await screen.findByText("Book A")).toBeInTheDocument();
  });

  it("shows 'No results for your search' when search returns no books", async () => {
    render(<BookCardOverview searchTerm="nohit" />);

    expect(mockLazyQuery).toHaveBeenCalled();

    expect(
      await screen.findByText("No results for your search"),
    ).toBeInTheDocument();
  });
});
