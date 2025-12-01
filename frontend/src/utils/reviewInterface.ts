export interface Review {
  id: number;
  bookId: number;
  userId: number;
  comment: string;
  rating: number; // 0-5
  dateCreated?: string;
}
