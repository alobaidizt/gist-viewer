const { gql } = require('apollo-server-express');

module.exports = gql`
type GistFile {
  filename: String!
}

type Gist {
  id: ID!
  createdOn: Float!
  files: [GistFile]
}

type User {
  username: String!
  gists: [Gist]
}

type Query {
  user(username: String!): User
  gist(id: ID!): Gist
}
`;