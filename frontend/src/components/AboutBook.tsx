import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import PlaceholderImage from "../assets/PlaceholderImage.png";
import type { Book } from "../utils/BookInterface";

interface AboutBookProps {
  book: Book;
}
export function AboutBook({ book }: AboutBookProps) {
  return (
    // Responsiv Design: flex-col as standard (mobile) and lg:grid lg:grid-cols-2 for desktop.
    <Card
      className="flex flex-col lg:grid lg:grid-cols-2 lg:h-[75vh]"
      component="article"
      aria-labelledby={`book-title-${book.id}`}
      sx={{
        bgcolor: "var(--card)",
        borderRadius: 5,
        color: "var(--text)",
      }}
    >
      <CardMedia
        component="img"
        alt={
          book.title
            ? `Cover image for the book ${book.title}`
            : `Placeholder cover for ${book.title}`
        }
        image={book.image || PlaceholderImage}
        // Responsiv Design: decrease for smaller size (h-80) or smaller, and full height for desktop.
        className="object-cover h-80 lg:h-full w-full lg:w-auto"
      />
      <CardContent className="flex flex-col justify-center overflow-auto gap-2">
        <Typography variant="h5" component="h3" className="mb-2">
          {book.title}
        </Typography>
        <Typography variant="subtitle2" component="p" className="mb-2">
          <strong>Written by:</strong> {book.author}
          <br />
          <strong>Publication year:</strong> {book.publicationYear}
          <br />
          <strong>Genre:</strong> {book.genre}
        </Typography>
        <Typography variant="body2" component="p" className="leading-relaxed">
          <strong>Summary:</strong> <br /> {book.description}
        </Typography>
      </CardContent>
    </Card>
  );
}
