import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'

import * as models from 'db/models'
import schema from 'gql'


const env = process.env
const NODE_ENV = env.NODE_ENV || 'development'
const NODE_HOSTNAME = env.NODE_HOSTNAME || 'api.blog.dev'
const NODE_PORT = env.NODE_PORT || 4040
const APP_HOSTNAME = env.APP_HOSTNAME || 'app.blog.dev'


const server = express()
  .use(
    cors({
      origin: `http://${APP_HOSTNAME}`,
    }),
  )

  .use(
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
  )

  .use(
    async (req, res, next) => {
      const input = {
        first_name: 'Josh',
        last_name: 'Pashwari',
      }

      let user = await models.User.findOne(input)

      if (!user) {
        user = models.User.create({
          ...input,
          flair: 'is a dog',
          rank: 'ADMIN',
        })
      }

      req.user = user

      next()
    },
  )

  // .use('/graphql', graphqlExpress(req, res) => res.status(200).send('ok'))
  // .use('/graphiql', (req, res) => res.status(200).send('ok'))

  .use(
    '/graphql',
    graphqlExpress(req => ({
      schema,
      context: {
        user: req.user,
        models,
      },
    })),
  )

  .use(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
    }),
  )

server.listen(NODE_PORT, () =>
  console.log(
    `@ladm/blog-api:${NODE_ENV} is live at ${NODE_HOSTNAME}`))
// console.log(
//   `@ladm/blog-api:${NODE_ENV} is live at ${NODE_HOSTNAME}`))
