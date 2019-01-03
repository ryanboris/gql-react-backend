import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema
} from 'graphql'
import axios from 'axios'

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString }
  }
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    age: { type: GraphQLInt },
    company: {
      type: CompanyType,
      async resolve(parent, args, ctx, info) {
        const company = await axios.get(
          `http://localhost:3000/companies/${parent.companyId}`
        )
        return company.data
      }
    }
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
