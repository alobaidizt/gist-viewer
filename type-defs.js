const { gql } = require('apollo-server-express');

module.exports = gql`
type GistFile {
  filename: String!
}

type Gist {
  id: ID!
  createdOn: Float!
  files: [GistFile]
  favorite: Boolean
}

type User {
  username: String!
  gists: [Gist]
}

type Query {
  user(username: String!): User
  gist(id: ID!): Gist
  favoriteGists: [Gist]
}

type Mutation {
    toggleGistFavorite(id: ID!): Boolean!
}
`;