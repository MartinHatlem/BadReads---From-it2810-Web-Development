import type { Review } from "./reviewInterface";

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  averageRating?: number; // 0 to 5
  image?: string; // URL or relative path
  description?: string;
  reviews?: Review[];
}
