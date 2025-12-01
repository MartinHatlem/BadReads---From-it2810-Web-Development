import fs from "fs";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

interface Book {
  id?: number;
  title: string;
  author: string;
  genre: string;
  averageRating: number;
  publicationYear: number;
  image: string;
  description: string;
}

interface User {
  id?: number;
  name: string;
  email: string;
}

interface Review {
  id?: number;
  bookId: number;
  userId: number;
  rating: number;
  comment?: string;
  dateCreated?: string;
}

interface DBData {
  books: Book[];
  users: User[];
  reviews: Review[];
}

async function seedDatabase() {
  const data = JSON.parse(fs.readFileSync("db.json", "utf8")) as DBData;

  const db: Database = await open({
    filename: "./database.sqlite",
    driver: sqlite3.Database,
  });

  // Created tables if not already existing
  await db.exec(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      genre TEXT,
      publicationYear INTEGER,
      image TEXT,
      averageRating REAL DEFAULT 0,
      description TEXT
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      bookId INTEGER NOT NULL,
      userId INTEGER NOT NULL,
      rating REAL NOT NULL,
      comment TEXT,
      dateCreated TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (bookId) REFERENCES books(id),
      FOREIGN KEY (userId) REFERENCES users(id)
    );
  `);

  console.log("Database tables verified/created.");

  // Ensure reviews table has dateCreated column even if table existed before
  const reviewColumns = (await db.all("PRAGMA table_info(reviews);")) as Array<{
    name: string;
  }>;
  const hasDateCreated = reviewColumns.some((c) => c.name === "dateCreated");
  if (!hasDateCreated) {
    await db.exec("ALTER TABLE reviews ADD COLUMN dateCreated TEXT;");
    await db.exec(
      "UPDATE reviews SET dateCreated = datetime('now') WHERE dateCreated IS NULL;",
    );
    console.log(
      "Added missing 'dateCreated' column to reviews and backfilled.",
    );
  }

  // Deletes old data
  await db.exec("DELETE FROM reviews;");
  await db.exec("DELETE FROM users;");
  await db.exec("DELETE FROM books;");

  // Insert books
  const insertBook = await db.prepare(`
    INSERT INTO books (title, author, genre, averageRating, publicationYear, image, description)
    VALUES ($title, $author, $genre, $averageRating, $publicationYear, $image, $description);
  `);

  for (const book of data.books) {
    await insertBook.run({
      $title: book.title,
      $author: book.author,
      $genre: book.genre,
      $averageRating: book.averageRating ?? 0,
      $publicationYear: book.publicationYear,
      $image: book.image,
      $description: book.description,
    });
  }
  await insertBook.finalize();
  console.log(`Inserted ${data.books.length} books.`);

  // Insert users
  const insertUser = await db.prepare(`
    INSERT INTO users (name, email)
    VALUES ($name, $email);
  `);

  for (const user of data.users) {
    await insertUser.run({
      $name: user.name,
      $email: user.email,
    });
  }
  await insertUser.finalize();
  console.log(`Inserted ${data.users.length} users.`);

  // Insert reviews
  const insertReview = await db.prepare(`
    INSERT INTO reviews (bookId, userId, rating, comment, dateCreated)
    VALUES ($bookId, $userId, $rating, $comment, $dateCreated);
  `);

  for (const review of data.reviews) {
    await insertReview.run({
      $bookId: review.bookId,
      $userId: review.userId,
      $rating: review.rating,
      $comment: review.comment ?? null,
      $dateCreated: review.dateCreated ?? new Date().toISOString(),
    });
  }
  await insertReview.finalize();
  console.log(`Inserted ${data.reviews.length} reviews.`);

  // Update averageRating for all books
  console.log("Updating average ratings...");

  const bookIds = await db.all<{ id: number }>("SELECT id FROM books;");

  for (const { id } of bookIds) {
    const ratings = await db.all<{ rating: number }>(
      "SELECT rating FROM reviews WHERE bookId = ?",
      [id],
    );

    if (ratings.length === 0) continue; // If no reviews - keep 0.0

    const avg =
      ratings.reduce(
        (sum: number, r: { rating: number }) => sum + r.rating,
        0,
      ) / ratings.length;

    await db.run("UPDATE books SET averageRating = ? WHERE id = ?", [avg, id]);
  }

  console.log("Average ratings updated.");

  await db.close();
  console.log("Database seeding completed successfully!");
}

seedDatabase().catch((err) => console.error("Fatal error:", err));
