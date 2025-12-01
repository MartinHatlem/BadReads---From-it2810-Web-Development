import { gql } from "@apollo/client";
// Books
export const GET_BOOK_BY_ID = gql`
  query GetBook($id: ID!) {
    allBooks(filter: { id: $id }) {
      id
      title
      author
      genre
      publicationYear
      image
      averageRating
      description
      reviews {
        userId
        rating
        comment
        dateCreated
      }
    }
  }
`;

// Use in searchbar for searching in any field (title, author, genre, etc.)
export const SEARCH_BOOKS = gql`
  query SearchBooks($searchTerm: String!) {
    allBooks(filter: { q: $searchTerm }) {
      id
      title
      author
      genre
      publicationYear
      image
      averageRating
      description
    }
  }
`;

// Offset: where to start fetching from
// Limit: how many to fetch

export const ADD_REVIEW = gql`
  mutation AddReview($input: ReviewInput!) {
    addReview(input: $input) {
      id
      rating
      comment
      userId
      bookId
      dateCreated
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($input: UserInput!) {
    addUser(input: $input) {
      id
      name
      email
    }
  }
`;

export const UPDATE_REVIEW = gql`
  mutation UpdateReview($input: ReviewInput!) {
    updateReview(input: $input) {
      id
      rating
      comment
      userId
      bookId
      dateCreated
    }
  }
`;

export const CHANGE_BOOK_AVERAGE_RATING = gql`
  mutation ChangeBookAverageRating($bookId: ID!, $newAverageRating: Float!) {
    changeBookAverageRating(
      bookId: $bookId
      newAverageRating: $newAverageRating
    ) {
      id
      averageRating
    }
  }
`;

export const GET_FILTERED_SORTED_BOOKS_LAZY = gql`
  query GetAllBooks(
    $offset: Int
    $limit: Int
    $genre: String
    $sort: SortingInput
    $minRating: Float
    $maxRating: Float
  ) {
    allBooks(
      offset: $offset
      limit: $limit
      filter: { genre: $genre, minRating: $minRating, maxRating: $maxRating }
      sort: $sort
    ) {
      id
      title
      author
      genre
      publicationYear
      image
      averageRating
      description
    }
  }
`;

export const GET_FILTERED_SORTED_SEARCHED_BOOKS_LAZY = gql`
  query GetAllBooks(
    $offset: Int
    $limit: Int
    $genre: String
    $sort: SortingInput
    $searchTerm: String
    $minRating: Float
    $maxRating: Float
  ) {
    allBooks(
      offset: $offset
      limit: $limit
      filter: {
        genre: $genre
        q: $searchTerm
        minRating: $minRating
        maxRating: $maxRating
      }
      sort: $sort
    ) {
      id
      title
      author
      genre
      publicationYear
      image
      averageRating
      description
    }
  }
`;

// Users
export const GET_ALL_USERS = gql`
  query GetAllUsers {
    allUsers {
      id
      name
      email
    }
  }
`;

// Reviews
export const GET_ALL_REVIEWS = gql`
  query GetAllReviews {
    allReviews {
      id
      bookId
      userId
      rating
      comment
      dateCreated
    }
  }
`;

export const GET_BOOK_WITH_REVIEWS = gql`
  query GetBookWithReviews($id: ID!) {
    allBooks(filter: { id: $id }) {
      id
      title
      averageRating
      reviews {
        userId
        rating
        comment
        dateCreated
      }
    }
  }
`;
