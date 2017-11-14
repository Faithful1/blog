

const Schema = `
  enum Rank {
    ADMIN
    MODERATOR
    AUTHOR
    VERIFIED
    UNVERIFIED
    BANNED
  }
  type User {
    id: String!
    rank: Rank
    first_name: String
    last_name: String
    flair: String
  }
  input UserInput {
    rank: Rank
    first_name: String
    last_name: String
    flair: String
  }
  extend type Query {
    user(id: String!): User!
    users(filter: UserInput): [User]!
  }
  extend type Mutation {
    user_create(input: UserInput!): User!
    user_update(id: String!, input: UserInput!): User!
    user_remove(id: String!): Boolean!
  }
`

const Resolvers = {
  Query: {
    // admin, moderator
    user: async (_, { id }, { models: { User } }) =>
      User.findById(id),

    // admin, moderator
    users: async (_, { filter }, { models: { User } }) =>
      User.find(filter),
  },

  Mutation: {
    // admin, moderator, auth0
    user_create: async (_, { input }, { models: { User } }) =>
      User.create(input),

    // admin, moderator, self
    // self cannot update rank
    user_update: async (_, { id, input }, { models: { User } }) =>
      User.findOneAndUpdate(id, input, {
        new: true,
      }),

    // admin, moderator, self
    user_remove: async (_, { id }, { models: { User } }) =>
      User.findById(id).remove(),
  },
}


export {
  Schema as UserSchema,
  Resolvers as UserResolvers,
}
