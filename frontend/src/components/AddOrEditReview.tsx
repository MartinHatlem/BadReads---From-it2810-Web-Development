import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client/react";
import { TextField, Rating, Button, Box, Typography } from "@mui/material";
import {
  ADD_REVIEW,
  CHANGE_BOOK_AVERAGE_RATING,
  UPDATE_REVIEW,
  GET_BOOK_BY_ID,
} from "../graphql/queries";
import { useAuth } from "../hooks/useAuth";
import type { Review } from "../utils/reviewInterface";
import type { Book } from "../utils/BookInterface";

interface AddReviewProps {
  bookId: number;
  numberOfReviews: number;
  averageRating: number;
  onReviewAdded: (newReview: Review, newAverageRating: number) => void;
  onReviewUpdated: (updatedReview: Review, newAverageRating: number) => void;
  reviewAlreadyAdded: boolean;
  isEditingReview?: boolean;
  reviewToEdit?: Review;
  setIsEditingReview?: (value: boolean) => void;
}

export function AddOrEditReviewBox({
  bookId,
  numberOfReviews,
  averageRating,
  onReviewAdded,
  onReviewUpdated,
  reviewAlreadyAdded,
  isEditingReview = false,
  reviewToEdit,
  setIsEditingReview,
}: AddReviewProps) {
  // If editing an existing review, initialize with the current review data
  const [rating, setRating] = useState<number | null>(
    reviewToEdit ? reviewToEdit.rating : null,
  );
  const [comment, setComment] = useState(
    reviewToEdit ? reviewToEdit.comment : "",
  );

  const [addReview, { loading }] = useMutation<
    { addReview: Review },
    {
      input: {
        bookId: number;
        userId: number;
        rating: number;
        comment: string;
      };
    }
  >(ADD_REVIEW, {
    update(cache, { data }) {
      if (!data?.addReview) return;

      const existing = cache.readQuery<{ allBooks: Book[] }>({
        query: GET_BOOK_BY_ID,
        variables: { id: bookId.toString() },
      });

      const book = existing?.allBooks?.[0];
      if (!book) return;

      const existingReviews = book.reviews || [];
      const existingAverageRating = book.averageRating || 0;

      const newAverageRating =
        (existingAverageRating * existingReviews.length +
          data.addReview.rating) /
        (existingReviews.length + 1);

      const updatedBook: Book = {
        ...book,
        reviews: [...existingReviews, data.addReview],
        averageRating: newAverageRating,
      };

      cache.writeQuery<{ allBooks: Book[] }>({
        query: GET_BOOK_BY_ID,
        variables: { id: bookId.toString() },
        data: { allBooks: [updatedBook] },
      });
    },
  });

  const [updateReview, { loading: updating }] = useMutation<
    { updateReview: Review },
    {
      input: {
        bookId: number;
        userId: number;
        rating: number;
        comment: string;
      };
    }
  >(UPDATE_REVIEW, {
    update(cache, { data }) {
      if (!data?.updateReview) return;

      const existing = cache.readQuery<{ allBooks: Book[] }>({
        query: GET_BOOK_BY_ID,
        variables: { id: bookId.toString() },
      });

      const book = existing?.allBooks?.[0];
      if (!book) return;

      const existingReviews = book.reviews || [];
      const reviewIndex = existingReviews.findIndex(
        (r) => r.id === data.updateReview.id,
      );

      const totalRating = existingReviews.reduce((acc, r, idx) => {
        if (idx === reviewIndex) return acc + data.updateReview.rating;
        return acc + r.rating;
      }, 0);

      const newAverageRating = totalRating / existingReviews.length;

      const updatedReviews = [...existingReviews];
      updatedReviews[reviewIndex] = data.updateReview;

      const updatedBook: Book = {
        ...book,
        reviews: updatedReviews,
        averageRating: newAverageRating,
      };

      cache.writeQuery<{ allBooks: Book[] }>({
        query: GET_BOOK_BY_ID,
        variables: { id: bookId.toString() },
        data: { allBooks: [updatedBook] },
      });
    },
  });

  const [changeBookAverageRating] = useMutation(CHANGE_BOOK_AVERAGE_RATING);
  const { currentUser, isLoggedIn } = useAuth();
  const userId = currentUser ? Number(currentUser.id) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !userId) return;

    const newAverageRating =
      isEditingReview && reviewToEdit
        ? (averageRating * numberOfReviews + rating - reviewToEdit.rating) /
          numberOfReviews
        : (averageRating * numberOfReviews + rating) / (numberOfReviews + 1);

    await changeBookAverageRating({
      variables: {
        bookId: bookId.toString(),
        newAverageRating: newAverageRating,
      },
    });

    if (isEditingReview && reviewToEdit) {
      const { data } = await updateReview({
        variables: { input: { bookId, userId, rating, comment } },
      });
      if (data?.updateReview) {
        onReviewUpdated(data.updateReview, newAverageRating);
        setIsEditingReview?.(false);
      }
    } else {
      const { data } = await addReview({
        variables: { input: { bookId, userId, rating, comment } },
      });

      if (data?.addReview) {
        onReviewAdded(data.addReview, newAverageRating);
      }
    }

    setRating(null);
    setComment("");
  };

  // When submiting review, fill the form so it's ready for editing
  useEffect(() => {
    if (isEditingReview && reviewToEdit) {
      setRating(reviewToEdit.rating);
      setComment(reviewToEdit.comment);
    }
  }, [isEditingReview, reviewToEdit]);

  // Clear form when user changes
  useEffect(() => {
    setRating(null);
    setComment("");
  }, [currentUser]);

  if (isLoggedIn === false) {
    return (
      <Typography variant="body2" className="italic mt-4 pb-4 text-center">
        Log in to add your own review.
      </Typography>
    );
  } else if (reviewAlreadyAdded && !isEditingReview) {
    return (
      <Typography variant="body2" className="italic mt-4 pb-4 text-center">
        You have added a review for this book.
      </Typography>
    );
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 border-t pb-2"
    >
      <Typography variant="h6" className="flex justify-between items-center">
        {isEditingReview ? "Edit your review" : "Add your review"}
        <Rating
          aria-label="Rating for this book"
          name="rating"
          value={rating}
          onChange={(_, newValue) => setRating(newValue)}
          // Lets user choose rating using tabs navigation
          getLabelText={(value) => `${value} Star${value !== 1 ? "s" : ""}`}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowUp") {
              setRating((prev) => (prev && prev < 5 ? prev + 1 : 1));
            } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
              setRating((prev) => (prev && prev > 1 ? prev - 1 : 5));
            }
          }}
          tabIndex={0}
          size="medium"
          sx={{
            "& .MuiRating-iconEmpty": {
              color: "var(--text-secondary)",
            },
          }}
        />
      </Typography>

      <TextField
        id="comment"
        name="comment"
        label="Comment"
        multiline
        rows={3}
        variant="outlined"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
        sx={{
          "& .MuiInputBase-input": {
            color: "#222725",
          },
          "& .MuiInputLabel-root": {
            color: "#222725",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "#222725" },
            "&:hover fieldset": { borderColor: "#2E6F40" },
            "&.Mui-focused fieldset": { borderColor: "#2E6F40" },
          },
          "& .MuiFormHelperText-root": {
            color: "#222725",
          },
          ".dark &": {
            "& .MuiInputBase-input": {
              color: "#F7F7F2",
            },
            "& .MuiInputLabel-root": {
              color: "#F7F7F2",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#F7F7F2" },
              "&:hover fieldset": { borderColor: "#899878" },
              "&.Mui-focused fieldset": { borderColor: "#899878" },
            },
            "& .MuiFormHelperText-root": {
              color: "#F7F7F2",
            },
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={loading || updating || !rating}
        aria-describedby="add-review-description"
        sx={{
          bgcolor: rating ? "var(--bg)" : "var(--accent-secondary)",
          color: rating ? "var(--accent)" : "var(--text-secondary)",
          fontWeight: 600,
          border: "1px solid var(--accent)",
          boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
          "&:hover": {
            bgcolor: rating
              ? "var(--accent-secondary)"
              : "var(--accent-secondary)",
            color: "var(--text)",
          },
          "&.Mui-disabled": {
            bgcolor: "var(--accent-secondary)", // mørkere bakgrunn
            color: "var(--text-secondary)",
            border: "1px solid var(--bg)",
            opacity: 0.9, // nok kontrast til å vise form
          },
          transition: "all 0.2s ease",
        }}
      >
        {loading
          ? "Submitting..."
          : isEditingReview
            ? "Update review"
            : "Publish review"}
      </Button>

      <Typography id="add-review-description" sx={{ display: "none" }}>
        Submit your rating and comment for this book
      </Typography>
    </Box>
  );
}
