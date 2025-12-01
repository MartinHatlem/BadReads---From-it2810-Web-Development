import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import PlaceholderImage from "../assets/PlaceholderImage.png";
import { useNavigate } from "react-router-dom";
import type { Book } from "../utils/BookInterface";

interface BookCardProps {
  book: Book;
  sizing?: string;
}

export function BookCard({ book, sizing }: BookCardProps) {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate("/project2/aboutBook/" + book.id.toString());
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    // Enter or space allows navigation
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <Card
      className={"!rounded-2xl hover:-translate-y-0.5 " + (sizing || "")}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${book.title || "unknown book"}`}
      sx={{
        bgcolor: "var(--card)",
        color: "var(--text)",
        "&:focus-visible": {
          outline: "3px solid var(--accent)",
          outlineOffset: "4px",
        },
      }}
    >
      <CardMedia
        className="aspect-[1/1] w-full object-cover"
        component="img"
        alt={"Cover image for the book " + (book.title || "Unknown")}
        loading="lazy"
        image={book.image || PlaceholderImage}
      />
      <CardContent className="px-3 py-4 text-center">
        <Typography gutterBottom variant="h5" component="h3">
          {book.title || "Unknown Title"}
        </Typography>
        <Typography variant="subtitle1" component="p">
          {book.author || "Unknown Author"}
          {" - "}
          {book.publicationYear ? `${book.publicationYear}` : "Unknown Year"}
        </Typography>
        <Typography variant="body2" component="p">
          {book.genre || "Unknown Genre"}
        </Typography>

        <Rating
          name="average-rating"
          value={book.averageRating}
          precision={0.5}
          readOnly
          sx={{
            "& .MuiRating-iconEmpty": {
              color: "var(--text-secondary)",
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
