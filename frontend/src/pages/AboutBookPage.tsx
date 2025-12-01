import { useNavigate } from "react-router-dom";
import { AboutBook } from "../components/AboutBook";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { ReviewOverview } from "../components/ReviewOverview";
import { useParams } from "react-router-dom";
import type { Book } from "../utils/BookInterface";
import { useQuery } from "@apollo/client/react";
import { GET_BOOK_BY_ID } from "../graphql/queries";
import { Typography } from "@mui/material";
import { useEffect } from "react";

function AboutBookPage() {
  const navigate = useNavigate();
  const { bookID } = useParams<{ bookID: string }>();

  const { data, loading, error, refetch } = useQuery<{ allBooks: Book[] }>(
    GET_BOOK_BY_ID,
    {
      variables: { id: bookID },
      skip: !bookID,
    },
  );

  useEffect(() => {
    if (bookID) {
      refetch();
    }
  }, [bookID, refetch]);

  const book = data?.allBooks?.[0] || null;

  if (loading) {
    return (
      <section className="flex p-8 justify-center" aria-busy="true">
        <Typography>Loading... </Typography>
      </section>
    );
  }

  if (error || !book) {
    return (
      <section className="p-8" role="alert">
        <Typography> Book not found </Typography>
      </section>
    );
  }

  return (
    // min-h-screen - the height of the navbar
    <section className="p-8 min-h-[calc(100vh-64px)]">
      <Container maxWidth="lg" sx={{ marginBottom: 4 }}>
        <Button
          aria-label="Go back to book list"
          sx={{
            borderColor: "var(--accent)",
            borderWidth: 1.5,
            color: "var(--accent)",
            borderRadius: 5,
          }}
          variant="outlined"
          onClick={() => navigate("/project2")}
        >
          ← Back
        </Button>

        <section
          className="flex flex-col lg:flex-row gap-6 pt-6"
          aria-label="Book details and reviews"
        >
          {/* Responsiv design: AboutBook 100% on mobile screen and 2/3 of screen on desktop.*/}
          <article className="w-full lg:w-2/3">
            <AboutBook book={book} />
          </article>

          {/* Responsiv design: RatingOverview 100% on mobile screen and 1/3 of screen on desktop.  */}
          <section className="w-full lg:w-1/3">
            <ReviewOverview book={book} />
          </section>
        </section>
      </Container>
    </section>
  );
}

export default AboutBookPage;
