const { ApolloServer, gql } = require('apollo-server')

// Toda request é POST
// Toda request bate no mesmo endpoint (/graphql)

// Query -> obter informações (GET)
// Mutation -> Manipular dados (POST,PUT,PATCH,DELETE)
// Scalar type -> String, Int, Float, Boolean e ID

// ! no final significa obrigatoriedade.

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    active: Boolean!
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Query {
    hello: String
    users: [User!]!
    getUserByEmail(email: String!): User!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`

const users = [
  {
    _id: String(Math.random()),
    name: 'Alberto',
    email: 'alberto@test.com',
    active: true
  },
  {
    _id: String(Math.random()),
    name: 'Alberto henrique',
    email: 'alberto@test2.com',
    active: false
  },
  {
    _id: String(Math.random()),
    name: 'Alberto fernandes',
    email: 'alberto@test3.com',
    active: true
  }
]
// ! no final do array significa q nao pode retornar null
const resolvers = {
  Query: {
    hello: () => 'Hello World!',
    users: () => users,
    getUserByEmail: (_, args) => {
      return users.find(user => user.email === args.email)
    }
  },
  Mutation: {
    createUser: (_, args) => {
      const newUser = {
        _id: String(Math.random()),
        name: args.name,
        email: args.email,
        active: true
      }
      users.push(newUser)
      return newUser
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => console.log(`Server started at ${url}`))
