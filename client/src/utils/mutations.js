import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
    $address: String!
    $postcode: String!
    $role: String!

  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
      address: $address
      postcode: $postcode
      role: $role
    ) {
      token
      user {
        _id
        firstName
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation Mutation(
    $firstName: String, 
    $lastName: String, 
    $email: String, 
    $address: String, 
    $picture: String, 
    $description: String
    ) {
    updateUser(
      firstName: $firstName, 
      lastName: $lastName, 
      email: $email, 
      address: $address, 
      picture: $picture, 
      description: $description
      ) {
      firstName
      lastName
      email
      description
      address
      picture
      postcode
    }
  }
  `;

export const DELETE_USER = gql`
  mutation deleteUser($_id: String!) {
    deleteUser(_id: $_id) {
      _id
    }
  }
`;

export const ADD_ORDER = gql`
  mutation AddOrder($bookings: [ID]!) {
    addOrder(bookings: $bookings) {
      _id
      purchaseDate
      bookings {
        id
        BookedDate
        price
      }
    }
  }
`;

export const DELETE_ORDER = gql`
mutation Mutation($bookings: [ID]!) {
  deleteOrder(bookings: $bookings) {
    _id
  }
}
`;


export const ADD_BOOKING = gql`
mutation Mutation($bookedDate: Int!, $price: Float!) {
  addBooking(BookedDate: $bookedDate, price: $price) {
    BookedBy {
      _id
      email
      firstName
      lastName
    }
    BookedDate
    id
    price
  }
}
`;

export const UPDATE_BOOKING = gql`
mutation Mutation($id: ID!, $bookedDate: Int!) {
  updateBooking(_id: $id, BookedDate: $bookedDate) {
    id
    BookedDate
  }
}
`;

export const DELETE_BOOKING = gql`
mutation Mutation($deleteBookingId: ID!) {
  deleteBooking(id: $deleteBookingId) {
    id
  }
}
`;