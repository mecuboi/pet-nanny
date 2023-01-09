const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    address: String
    postcode: Int
    isNanny: Boolean
    picture: String
    description: String
    price: Float
    orders: [Order]
  }
  type Booking {
    id: ID
    CreatedAt: Date
    BookedDate: Date
    User: User
  }

  type Order {
    _id: ID
    purchaseDate: String
    bookings: [Booking]
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    users: [User]
    user: (id: ID!): User
    booking(id: ID!): Booking
    bookings: [Booking]
    nannies(isNanny: Boolean = true): [User]
    nanny(isNanny: Boolean = true, id: ID!): User
  }
 
  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String, address: String, picture: String, description: String): User
    deleteUser(_id: ID!): User
    addOrder(bookings: [ID]!): Order
    deleteOrder(bookings: [ID]!): Order
    updateBooking(_id: ID!, BookedDate: Date!): Booking
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
 // categories: [Category]
  // products(category: ID, name: String): [Product]
  // product(_id: ID!): Product
  // order(_id: ID!): Order
  // checkout(products: [ID]!): Checkout