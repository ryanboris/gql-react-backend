import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} from 'graphql'
import axios from 'axios'

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
      async resolve(parent, args, ctx, info) {
        const user = await axios.get(`http://localhost:3000/users/${args.id}`)
        return user.data
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: RootQuery
})

export { schema as default }
