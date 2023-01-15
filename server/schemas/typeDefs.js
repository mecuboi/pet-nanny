const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    address: String
    postcode: String
    picture: String
    description: String
    role: String
    orders: [Order]
    bookings: [Booking]
  }
  type Booking {
    _id: ID
    createdAt: String
    bookedDate: String
    price: Float
    bookedBy: User
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
  }
  type Query {
    all: [User]
    users(role: String): [User]
    user(_id: ID!, role: String): User
    nannies(role: String): [User]
    nanny(_id: ID!, role: String): User
    orders: [Order]
    userOrder(_id: ID!): Order
    singleOrder(_id: ID!): Order
    bookings: [Booking]
    userBooking(_id: ID!): Booking
  }
 
  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, postcode: String, address: String, picture: String, description: String, role: String): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String, address: String, picture: String, description: String, role: String): User
    deleteUser(_id: ID!): User
    addOrder(bookings: [ID]!): Order
    deleteOrder(_id: ID!, bookingId: [ID]!): Order
    addBooking(bookedDate: String!, price: Float!): Booking
    updateBooking(_id: ID!, bookedDate: String!): Booking
    deleteBooking(_id: ID!): Booking
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
 // categories: [Category]
  // products(category: ID, name: String): [Product]
  // product(_id: ID!): Product
  // order(_id: ID!): Order
  // checkout(products: [ID]!): Checkout