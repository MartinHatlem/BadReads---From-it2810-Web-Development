export const SORTING_CATEGORIES = ["title", "publicationYear", "averageRating"];

export type SortingColumn = (typeof SORTING_CATEGORIES)[number];

export interface SortingInfo {
  value: SortingColumn | "" | null; //The field to sort by. E.g. sorting books by the field "averageRating"
  direction: "ASC" | "DESC" | null; // Ascending or descending order
}
