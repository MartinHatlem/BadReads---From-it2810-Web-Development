import { SORTING_CATEGORIES, type SortingInfo } from "../src/utils/sorting.ts";
import dbPromise from "./database.ts"; // skal være Promise<Database>

interface BookFilter {
  id?: string;
  q?: string;
  genre?: string;
  minRating?: number;
  maxRating?: number;
}

interface BookInput {
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  image?: string;
  description?: string;
}

interface ReviewInput {
  id: number;
  bookId: number;
  userId: number;
  rating: number;
  comment?: string;
}

interface UserInput {
  name: string;
  email: string;
}

// Typefix for sqlite RunResult
type RunResult = {
  changes?: number;
  lastInsertRowid?: number | bigint;
};

type BookRow = BookInput & {
  id: number;
  averageRating?: number | null;
};

const ALLOWED_SORT_FIELDS = [
  "title",
  "author",
  "genre",
  "averageRating",
  "publicationYear",
];

export const resolvers = {
  Query: {
    allBooks: async (
      _: unknown,
      args: {
        filter?: BookFilter;
        offset?: number;
        limit?: number;
        sort?: SortingInfo;
      },
    ) => {
      const db = await dbPromise;
      let query = "SELECT * FROM books";
      const params: Array<string | number | bigint | null> = [];
      const conditions: string[] = [];

      if (args.filter?.id) {
        conditions.push("id = ?");
        params.push(args.filter.id);
      }
      if (args.filter?.q) {
        conditions.push("(title LIKE ? OR author LIKE ? OR genre LIKE ?)");
        const term = `%${args.filter.q}%`;
        params.push(term, term, term);
      }
      if (args.filter?.genre) {
        conditions.push("genre LIKE ?");
        params.push(`%${args.filter.genre}%`);
      }

      if (args.filter?.minRating !== undefined) {
        conditions.push("averageRating >= ?");
        params.push(args.filter.minRating);
      }

      if (args.filter?.maxRating !== undefined) {
        conditions.push("averageRating <= ?");
        params.push(args.filter.maxRating);
      }

      if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
      }

      if (
        args.sort &&
        args.sort.value &&
        SORTING_CATEGORIES.includes(args.sort.value) &&
        ALLOWED_SORT_FIELDS.includes(args.sort.value) &&
        args.sort.direction &&
        ["ASC", "DESC"].includes(args.sort.direction)
      ) {
        query += ` ORDER BY ${args.sort.value} ${args.sort.direction}`;
      }

      if (args.limit) query += ` LIMIT ${args.limit}`;
      if (args.offset) query += ` OFFSET ${args.offset}`;

      const stmt = await db.prepare(query);
      try {
        const rows = await stmt.all(...params);
        return rows;
      } finally {
        await stmt.finalize();
      }
    },

    allUsers: async () => {
      const db = await dbPromise;
      const stmt = await db.prepare("SELECT * FROM users");
      try {
        return await stmt.all();
      } finally {
        await stmt.finalize();
      }
    },

    allReviews: async () => {
      const db = await dbPromise;
      const stmt = await db.prepare("SELECT * FROM reviews");
      try {
        return await stmt.all();
      } finally {
        await stmt.finalize();
      }
    },
  },

  Mutation: {
    addBook: async (_: unknown, { input }: { input: BookInput }) => {
      const db = await dbPromise;
      const insert = await db.prepare(`
        INSERT INTO books (title, author, genre, publicationYear, image, description)
        VALUES ($title, $author, $genre, $publicationYear, $image, $description)
      `);
      try {
        const result = (await insert.run({
          $title: input.title,
          $author: input.author,
          $genre: input.genre,
          $publicationYear: input.publicationYear,
          $image: input.image,
          $description: input.description,
        })) as RunResult;

        const select = await db.prepare("SELECT * FROM books WHERE id = ?");
        try {
          const rawId = result.lastInsertRowid;
          if (!rawId) throw new Error("Could not determine inserted row ID");

          const newId = typeof rawId === "bigint" ? Number(rawId) : rawId;

          const row = await select.get(newId);

          return row;
        } finally {
          await select.finalize();
        }
      } finally {
        await insert.finalize();
      }
    },

    deleteBook: async (_: unknown, { id }: { id: number }) => {
      const db = await dbPromise;
      const stmt = await db.prepare("DELETE FROM books WHERE id = ?");
      try {
        const result = (await stmt.run(id)) as RunResult;
        return (result.changes ?? 0) > 0;
      } finally {
        await stmt.finalize();
      }
    },

    changeBookAverageRating: async (
      _: unknown,
      {
        bookId,
        newAverageRating,
      }: { bookId: string; newAverageRating: number },
    ) => {
      const db = await dbPromise;
      const existing = await db.get("SELECT * FROM books WHERE id = ?", [
        bookId,
      ]);
      if (!existing) return null;
      await db.run("UPDATE books SET averageRating = ? WHERE id = ?", [
        newAverageRating,
        bookId,
      ]);
      return { ...existing, averageRating: newAverageRating };
    },

    addReview: async (_: unknown, { input }: { input: ReviewInput }) => {
      const db = await dbPromise;

      const insert = await db.prepare(`
        INSERT INTO reviews (bookId, userId, rating, comment)
        VALUES (?, ?, ?, ?)
      `);

      try {
        const result = await insert.run(
          input.bookId,
          input.userId,
          input.rating,
          input.comment,
        );

        console.log("addReview result:", result);

        const rawId =
          result.lastInsertRowid ??
          result.lastID ??
          result.insertId ??
          result.id ??
          null;

        if (rawId == null) {
          throw new Error("Could not retrieve inserted review ID");
        }

        const newId = typeof rawId === "bigint" ? Number(rawId) : Number(rawId);

        const select = await db.prepare("SELECT * FROM reviews WHERE id = ?");
        try {
          return await select.get(newId);
        } finally {
          await select.finalize();
        }
      } finally {
        await insert.finalize();
      }
    },

    updateReview: async (_: unknown, { input }: { input: ReviewInput }) => {
      const db = await dbPromise;

      // Check if review exists
      const existing = await db.get(
        "SELECT * FROM reviews WHERE bookId = ? AND userId = ?",
        [input.bookId, input.userId],
      );
      if (!existing) {
        throw new Error("Review not found");
      }

      // Update the review
      const update = await db.prepare(`
        UPDATE reviews 
        SET rating = $rating, comment = $comment
        WHERE bookId = $bookId AND userId = $userId
      `);
      try {
        await update.run({
          $rating: input.rating,
          $comment: input.comment ?? null,
          $bookId: input.bookId,
          $userId: input.userId,
        });

        // Return the updated review
        const select = await db.prepare(
          "SELECT * FROM reviews WHERE bookId = ? AND userId = ?",
        );
        try {
          return await select.get(input.bookId, input.userId);
        } finally {
          await select.finalize();
        }
      } finally {
        await update.finalize();
      }
    },

    deleteReview: async (_: unknown, { id }: { id: number }) => {
      const db = await dbPromise;

      const check = await db.prepare("SELECT * FROM reviews WHERE id = ?");
      try {
        const review = await check.get(id);
        if (!review) return false;
      } finally {
        await check.finalize();
      }

      const del = await db.prepare("DELETE FROM reviews WHERE id = ?");
      try {
        const result = (await del.run(id)) as RunResult;
        return (result.changes ?? 0) > 0;
      } finally {
        await del.finalize();
      }
    },

    addUser: async (_: unknown, { input }: { input: UserInput }) => {
      const db = await dbPromise;
      const insert = await db.prepare(`
        INSERT INTO users (name, email)
        VALUES (?, ?)
      `);

      try {
        const result = await insert.run(input.name, input.email);

        const rawId =
          result.lastInsertRowid ??
          result.lastID ??
          result.insertId ??
          result.id ??
          null;

        if (rawId == null) {
          throw new Error("Could not determine inserted row ID");
        }

        const newId = typeof rawId === "bigint" ? Number(rawId) : rawId;

        const select = await db.prepare("SELECT * FROM users WHERE id = ?");
        try {
          return await select.get(newId);
        } finally {
          await select.finalize();
        }
      } finally {
        await insert.finalize();
      }
    },

    deleteUser: async (_: unknown, { id }: { id: number }) => {
      const db = await dbPromise;

      const check = await db.prepare("SELECT * FROM users WHERE id = ?");
      try {
        const user = await check.get(id);
        if (!user) return false;
      } finally {
        await check.finalize();
      }

      const del = await db.prepare("DELETE FROM users WHERE id = ?");
      try {
        const result = (await del.run(id)) as RunResult;
        return (result.changes ?? 0) > 0;
      } finally {
        await del.finalize();
      }
    },
  },

  Book: {
    reviews: async (book: { id: number }) => {
      const db = await dbPromise;
      const stmt = await db.prepare("SELECT * FROM reviews WHERE bookId = ?");
      try {
        return await stmt.all(book.id);
      } finally {
        await stmt.finalize();
      }
    },
    averageRating: (book: BookRow) => {
      return book.averageRating ?? 0;
    },
  },
};
