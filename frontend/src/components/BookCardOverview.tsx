import { BookCard } from "./BookCard";
import type { Book } from "../utils/BookInterface";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLazyQuery } from "@apollo/client/react";
import {
  GET_FILTERED_SORTED_SEARCHED_BOOKS_LAZY,
  GET_FILTERED_SORTED_BOOKS_LAZY,
} from "../graphql/queries";
import { Typography } from "@mui/material";

const PAGE_SIZE = 9;

interface BookCardOverviewProps {
  searchTerm?: string;
  genre?: string;
  sortingCategory?: string;
  sortingDirection?: "ASC" | "DESC";
  minRating?: number | null;
  maxRating?: number | null;
  triggerRefetch?: number;
  onReviewChanged?: () => void;
}

export default function BookCardOverview({
  searchTerm = "",
  genre = "",
  sortingCategory = "title",
  sortingDirection = "ASC",
  minRating = null,
  maxRating = null,
  triggerRefetch,
}: BookCardOverviewProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const offset = useRef(0); // Using ref to update offset immediately
  const [hasMore, setHasMore] = useState(true);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const isResettingRef = useRef(false);

  const hasSearchTerm = searchTerm && searchTerm.trim() !== "";

  const [fetchBooksQuery, { loading }] = useLazyQuery<{ allBooks: Book[] }>(
    hasSearchTerm
      ? GET_FILTERED_SORTED_SEARCHED_BOOKS_LAZY
      : GET_FILTERED_SORTED_BOOKS_LAZY,
  );

  // Lazy loading of books
  const loadPage = useCallback(async () => {
    if (loading || !hasMore || isResettingRef.current) return;

    try {
      const { data } = await fetchBooksQuery({
        variables: {
          offset: offset.current,
          limit: PAGE_SIZE,
          genre: genre || null,
          minRating: minRating ?? null,
          maxRating: maxRating ?? null,
          sort: {
            value: sortingCategory,
            direction: sortingDirection,
          },
          ...(hasSearchTerm ? { searchTerm } : {}),
        },
      });

      if (data?.allBooks) {
        setBooks((prev) => [...prev, ...data.allBooks]);
        offset.current += data.allBooks.length;
        setHasMore(data.allBooks.length === PAGE_SIZE);
      }
    } catch (error: unknown) {
      // Apollo aborts previous requests when new ones are fired (e.g. slider dragged fast)
      if (error instanceof Error && error.name === "AbortError") return;
      console.error(error);
    }
  }, [
    loading,
    hasMore,
    fetchBooksQuery,
    genre,
    sortingCategory,
    sortingDirection,
    searchTerm,
    minRating,
    maxRating,
    hasSearchTerm,
  ]); // Dependencies. Reloads when these update

  // Reset page when filters change
  const resetAndLoad = useCallback(async () => {
    isResettingRef.current = true;
    setBooks([]);
    offset.current = 0;
    setHasMore(true);

    try {
      const { data } = await fetchBooksQuery({
        variables: {
          offset: 0,
          limit: PAGE_SIZE,
          genre: genre || null,
          minRating: minRating ?? null,
          maxRating: maxRating ?? null,
          sort: {
            value: sortingCategory,
            direction: sortingDirection,
          },
          ...(hasSearchTerm ? { searchTerm } : {}),
        },
      });

      if (data?.allBooks) {
        setBooks(data.allBooks);
        offset.current = data.allBooks.length;
        setHasMore(data.allBooks.length === PAGE_SIZE);
      }
    } catch (error: unknown) {
      if (error instanceof Error && error.name === "AbortError") return;
      console.error(error);
    } finally {
      isResettingRef.current = false;
    }
  }, [
    genre,
    sortingCategory,
    sortingDirection,
    searchTerm,
    minRating,
    maxRating,
    hasSearchTerm,
    fetchBooksQuery,
  ]);

  // Added to try to fix the bug where the stars of the rating is not updated the first time going back to Home.tsx
  useEffect(() => {
    if (triggerRefetch !== undefined) {
      resetAndLoad();
    }
  }, [triggerRefetch, resetAndLoad]);

  // On filter/sort/search change → reset
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // Skip first render
    }
    resetAndLoad();
  }, [
    genre,
    sortingCategory,
    sortingDirection,
    searchTerm,
    minRating,
    maxRating,
    resetAndLoad,
  ]);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadPage();
      },
      { rootMargin: "800px 0px 800px 0px" },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [loadPage, searchTerm]);

  return (
    <>
      <section className="flex flex-wrap gap-10 justify-center">
        {books.length === 0 && !loading ? (
          <Typography variant="h6" sx={{ mt: 4, color: "var(--text)" }}>
            No results for your search
          </Typography>
        ) : (
          books.map((book) => (
            // Specify sizing like this to avoid cards changing size when content refreshes
            <BookCard
              key={`book-${book.id}`}
              book={book}
              sizing="w-80 cursor-pointer sm:w-[calc(45%-1.25rem)] lg:w-[calc(33.333%-1.67rem)]"
            />
          ))
        )}
      </section>

      <div ref={sentinelRef} style={{ height: 1 }} />
    </>
  );
}
