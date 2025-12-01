import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    genre: String
    publicationYear: Int
    image: String
    averageRating: Float
    description: String
    reviews: [Review]
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Review {
    id: ID!
    bookId: ID!
    userId: ID!
    rating: Float!
    comment: String
    dateCreated: String
  }

  input ReviewInput {
    bookId: ID!
    userId: ID!
    rating: Float!
    comment: String
  }

  input UserInput {
    name: String
    email: String
  }

  input BookFilter {
    id: ID
    q: String
    genre: String
    minRating: Float
    maxRating: Float
  }

  input SortingInput {
    value: String! # the column name
    direction: String! # "ASC" or "DESC"
  }

  input NewBookInput {
    title: String!
    author: String!
    genre: String
    publicationYear: Int
    image: String
    averageRating: Float
    description: String
  }

  type Mutation {
    addBook(input: NewBookInput!): Book
    deleteBook(id: ID!): Boolean
    addReview(input: ReviewInput!): Review
    updateReview(input: ReviewInput!): Review
    deleteReview(id: ID!): Boolean
    addUser(input: UserInput!): User
    deleteUser(id: ID!): Boolean
    changeBookAverageRating(bookId: ID!, newAverageRating: Float!): Book
  }

  type Query {
    allBooks(
      filter: BookFilter
      offset: Int
      limit: Int
      sort: SortingInput
    ): [Book]
    allUsers: [User]
    allReviews: [Review]
  }
`;
