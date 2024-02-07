const typeDefs = `
type User {
  _id: ID!
  username: String!
  email: String!
  password: String! # Note: You should not return the password in a real-world application
  savedBooks: [Book!]!
}

type Book {
  bookId: ID!
  title: String!
  author: String!
}

type AuthPayload {
  token: String!
  user: User!
}

type Query {
  getSingleUser(id: ID, username: String): User!
}

type Mutation {
  createUser(username: String!, email: String!, password: String!): AuthPayload!
  login(username: String, email: String, password: String!): AuthPayload!
  saveBook(book: BookInput!): User!
  deleteBook(bookId: ID!): User!
}

input BookInput {
  bookId: ID!
  title: String!
  author: String!
}
`;

module.exports = typeDefs;

