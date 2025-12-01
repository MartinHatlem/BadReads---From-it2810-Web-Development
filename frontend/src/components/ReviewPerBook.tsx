import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { IconButton, Tooltip } from "@mui/material";

import type { Review } from "../utils/reviewInterface";
import type { User } from "../utils/userInterface";

interface ReviewPerBookProps {
  reviews: Review[];
  users: User[];
  currentUserId: number;
  isEditingReview: boolean;
  setIsEditingReview: (isEditing: boolean) => void;
}

export function ReviewPerBook({
  reviews,
  users,
  currentUserId,
  isEditingReview,
  setIsEditingReview,
}: ReviewPerBookProps) {
  const userMap = Object.fromEntries(users.map((user) => [user.id, user.name]));

  // Format date to readable format
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!reviews || reviews.length === 0) {
    return (
      <Typography variant="body1" className="text-center italic mt-4">
        No ratings found for this book.
      </Typography>
    );
  }

  const editIcon = () => (
    <Tooltip
      title={isEditingReview ? "Stop editing your review" : "Edit your review"}
    >
      <IconButton
        aria-label={
          isEditingReview ? "Stop editing your review" : "Edit your review"
        }
        sx={{
          backgroundColor: isEditingReview ? "var(--accent)" : "transparent",
        }}
        onClick={() => setIsEditingReview(!isEditingReview)}
      >
        <EditRoundedIcon
          sx={{ color: "var(--text-secondary)", cursor: "pointer" }}
        />
      </IconButton>
    </Tooltip>
  );

  return (
    <>
      {reviews.map((review, index) => {
        const isCurrentUserReview =
          Number(review.userId) === Number(currentUserId);

        return (
          <Box
            key={index}
            data-testid="review-item"
            component="article"
            aria-label={`Review by ${userMap[review.userId] ?? "Unknown user"}`}
            className="mb-3"
            sx={
              isCurrentUserReview && isEditingReview
                ? {
                    boxShadow: "0 6px 18px rgba(0, 0, 0, 0.22)",
                    transform: "translateY(-2px)",
                    padding: 1,
                  }
                : undefined
            }
          >
            <Box className="flex justify-between items-center">
              <Box>
                <Typography
                  variant="caption"
                  className="text-gray-500 dark:text-[var(--text)]"
                >
                  {userMap[review.userId] ?? "Unknown User"}
                  {review.dateCreated && (
                    <Typography
                      component="span"
                      variant="caption"
                      className="text-gray-400 dark:text-[var(--text-secondary)] ml-2"
                    >
                      • {formatDate(review.dateCreated)}
                    </Typography>
                  )}
                </Typography>
              </Box>
              {isCurrentUserReview && editIcon()}
            </Box>

            <Typography component="blockquote" variant="body1">
              “{review.comment}”
            </Typography>
            <Rating
              name={`review-rating-${review.id ?? review.userId}`}
              value={Number(review.rating ?? 0)}
              precision={0.5}
              readOnly
              aria-labelledby={`review-author-${index}`}
              aria-label={`Rating: ${review.rating} out of 5`}
              sx={{
                "& .MuiRating-iconEmpty": { color: "var(--text-secondary)" },
              }}
            />
            {index < reviews.length - 1 && (
              <Divider role="separator" aria-hidden="true" className="my-2" />
            )}
          </Box>
        );
      })}
    </>
  );
}
