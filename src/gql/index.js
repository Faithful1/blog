import { merge } from 'lodash'

import { makeExecutableSchema } from 'graphql-tools'

import { ArticleSchema, ArticleResolvers } from './models/Article'
import { UserSchema, UserResolvers } from './models/User'


const typeDefs = `
  type Query {
    hello: String!
  }
  type Mutation {
    hello: String!
  }
  schema {
    query: Query
    mutation: Mutation
  }
`

const resolvers = {
  Query: {
    hello: () => 'sup',
  },

  Mutation: {
    hello: () => 'sup',
  },
}


export default makeExecutableSchema({
  typeDefs: [
    typeDefs,

    UserSchema,
    ArticleSchema,
  ],

  resolvers: merge(
    resolvers,

    UserResolvers,
    ArticleResolvers,
  ),

  logger: {
    log: err =>
      // eslint-disable-next-line no-console
      console.error(err),
  },
})
