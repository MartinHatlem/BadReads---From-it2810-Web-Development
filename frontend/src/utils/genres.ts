export const GENRES = [
  "Adventure",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Romance",
  "Steampunk",
  "Cyberpunk",
  "Horror",
  "Drama",
  "Philosophy",
  "Education",
] as const;

export type Genre = (typeof GENRES)[number];
