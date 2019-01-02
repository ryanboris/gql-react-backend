import express from 'express'
import expressGraphQL from 'express-graphql'

const app = express()

app.use(
  '/graphql',
  expressGraphQL({
    graphiql: true,
    schema: './schema/schema.js'
  })
)

app.listen(4000, () => console.log('Listening.'))
