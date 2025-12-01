import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import { useState } from "react";
import { useQuery } from "@apollo/client/react";

import type { Book } from "../utils/BookInterface";
import type { User } from "../utils/userInterface";
import type { Review } from "../utils/reviewInterface";

import { ReviewPerBook } from "./ReviewPerBook";
import { AddOrEditReviewBox } from "./AddOrEditReview";
import { GET_ALL_USERS } from "../graphql/queries";
import { useAuth } from "../hooks/useAuth";

interface ReviewOverviewProps {
  book: Book;
  onReviewChanged?: () => void;
}

export function ReviewOverview({ book, onReviewChanged }: ReviewOverviewProps) {
  const { id, title } = book;
  const [reviewsToDisplay, setReviewsToDisplay] = useState(book.reviews || []);
  const [averageRating, setAverageRating] = useState(book.averageRating || 0);
  const [isEditingReview, setIsEditingReview] = useState(false);

  const { data, loading, error } = useQuery<{ allUsers: User[] }>(
    GET_ALL_USERS,
  );

  const currentUserId = Number(useAuth().currentUser?.id || -1);

  // Added to find currentUser's review for editIcon
  const currentUserReview: Review | undefined = reviewsToDisplay.find(
    (review) => Number(review.userId) === currentUserId,
  );

  const reviewAlreadyAdded = reviewsToDisplay.some(
    (review) => Number(review.userId) === currentUserId,
  );

  if (loading) return <Typography>Loading users…</Typography>;
  if (error) return <Typography>Error loading users</Typography>;

  const users = data?.allUsers || [];

  const handleReviewAdded = async (newReview: Review, newAvg: number) => {
    setReviewsToDisplay((prev) => [...prev, newReview]);
    setAverageRating(newAvg);
    onReviewChanged?.();
  };

  const handleReviewUpdated = (updatedReview: Review, newAvg: number) => {
    setIsEditingReview(false);
    setReviewsToDisplay((prev) =>
      prev.map((review) =>
        Number(review.userId) === Number(updatedReview.userId)
          ? updatedReview
          : review,
      ),
    );
    setAverageRating(newAvg);
    onReviewChanged?.();
  };

  return (
    <Card
      component="section"
      aria-label={`Reviews and ratings for ${title}`}
      className="flex flex-col px-4 lg:h-[75vh]"
      sx={{ bgcolor: "var(--card)", borderRadius: 5, color: "var(--text)" }}
    >
      <Typography variant="h5" component="h2" className="px-4 pt-6">
        Reviews of {title}
      </Typography>
      <Typography variant="subtitle1" component="p" className="flex gap-2 px-4">
        Overall rating:{" "}
        <Rating
          name="overall-rating-read"
          value={averageRating}
          precision={0.5}
          readOnly
          aria-label={`Overall rating of ${averageRating || 0} out of 5`}
          sx={{ "& .MuiRating-iconEmpty": { color: "var(--text-secondary)" } }}
        />
        ({reviewsToDisplay.length})
      </Typography>

      <CardContent className="flex-grow overflow-y-auto px-4 py-4">
        <ReviewPerBook
          reviews={reviewsToDisplay}
          users={users}
          isEditingReview={isEditingReview}
          setIsEditingReview={setIsEditingReview}
          currentUserId={currentUserId}
        />
      </CardContent>

      <AddOrEditReviewBox
        bookId={id}
        averageRating={averageRating}
        numberOfReviews={reviewsToDisplay.length}
        onReviewAdded={handleReviewAdded}
        onReviewUpdated={handleReviewUpdated}
        reviewAlreadyAdded={reviewAlreadyAdded}
        reviewToEdit={currentUserReview}
        isEditingReview={isEditingReview}
      />
    </Card>
  );
}
