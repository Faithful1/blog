

const Schema = `

  type Article {
    id: String!
    title: String
    content: String
  }
  input ArticleInput {
    title: String
    content: String
  }
  extend type Query {
    article(id: String!): Article!
    articles(filter: ArticleInput): [Article]!
  }
  extend type Mutation {
    article_create(input: ArticleInput!): Article!
    article_update(id: String!, input: ArticleInput!): Article!
    article_remove(id: String!): Boolean!
  }
`

const Resolvers = {
  Query: {
    // admin, moderator
    article: async (_, { id }, { models: { Article } }) =>
      Article.findById(id),

    // admin, moderator
    articles: async (_, { filter }, { models: { Article } }) =>
      Article.find(filter),
  },

  Mutation: {
    // admin, moderator, auth0
    article_create: async (_, { input }, { models: { Article } }) =>
      Article.create(input),

    // admin, moderator, self
    // self cannot update rank
    article_update: async (_, { id, input }, { models: { Article } }) =>
      Article.findOneAndUpdate(id, input, {
        new: true,
      }),

    // admin, moderator, self
    article_remove: async (_, { id }, { models: { Article } }) =>
      Article.findById(id).remove(),
  },
}

export {
  Schema as ArticleSchema,
  Resolvers as ArticleResolvers,
}
