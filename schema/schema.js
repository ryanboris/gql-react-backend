import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} from 'graphql'
import _ from 'lodash'

const users = [
  {
    id: '23',
    firstName: 'Bill',
    age: 20
  },
  {
    id: '11',
    firstName: 'Sara',
    age: 34
  }
]

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt }
  }
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args, ctx, info) {
        return _.find(users, { id: args.id })
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: RootQuery
})

export { schema as default }
