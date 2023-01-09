const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    address: String
    postcode: Integer
    picture: String
    description: String
    orders: [Order]
  }
  type Booking {
    id: ID
    CreatedAt: Date
    BookedDate: Date
    price: Float
    BookedBy: User
  }
  type Order {
    _id: ID
    purchaseDate: String
    bookings: Booking
  }
  type Checkout {
    session: ID
  }
  type Auth {
    token: ID
    user: User
    nanny: Nanny
  }
  type Query {
    all: [User]
    users(role: String): [User]
    user(id: ID!, role: String): User
    nannies(role: String): [User]
    nanny: (id: ID!, role: String): User
    orders: [Order]
    order: (id: ID!): Order
    bookings: [Booking]
    booking(id: ID!): Booking
  }
 
  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, address: String, picture: String, description: String, role: String): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String, address: String, picture: String, description: String, role: String): User
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