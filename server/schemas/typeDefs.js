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
    id: ID
    CreatedAt: Int
    BookedDate: Int
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
  }
  type Query {
    me: User
    all: [User]
    users(role: String): [User]
    user(id: ID!): User
    nannies(role: String): [User]
    nanny(id: ID!, role: String): User
    orders: [Order]
    order(id: ID!): Order
    bookings: [Booking]
    booking(id: ID!): Booking
  }
 
  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, postcode: String, address: String, picture: String, description: String, role: String): Auth
    updateUser(firstName: String, lastName: String, email: String, password: String, address: String, postcode: String, picture: String, description: String, role: String): User
    deleteUser(_id: ID!): User
    addOrder(bookings: [ID]!): Order
    deleteOrder(bookings: [ID]!): Order
    addBooking(BookedDate: Int!, price: Float!): Booking
    updateBooking(_id: ID!, BookedDate: Int!): Booking
    deleteBooking(id: ID!): Booking
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
 // categories: [Category]
  // products(category: ID, name: String): [Product]
  // product(_id: ID!): Product
  // order(_id: ID!): Order
  // checkout(products: [ID]!): Checkout