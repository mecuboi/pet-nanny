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
  mutation updateUser(
    $firstName: String, 
    $lastName: String, 
    $email: String, 
    $address: String,
    $postcode: String, 
    $picture: String, 
    $description: String
    ) {
    updateUser(
      firstName: $firstName, 
      lastName: $lastName, 
      email: $email, 
      address: $address, 
      postcode: $postcode,
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
  mutation addOrder($bookings: [ID]!) {
    addOrder(bookings: $bookings) {
      _id
      purchaseDate
    }
  }
`;

export const ADD_BOOKING = gql`
  mutation addBooking($bookedDate: String!, $price: Float!) {
    addBooking (bookedDate: $bookedDate, price: $price) {
      _id
      createdAt
      bookedDate
      price
      bookedBy {
        _id
        email
        firstName
        lastName
      }
    }}
`;

export const UPDATE_BOOKING = gql`
  mutation updateBooking($id: ID!, $bookedDate: String!) {
    updateBooking (_id: $id, bookedDate: $bookedDate){
      _id
      bookedDate
      price
      createdAt
      bookedBy {
        _id
        email
        firstName
        lastName
      }
    }
  }
`

//delete function works, however in apollo, it will not return anything since the booking has been deleted.
export const DELETE_BOOKING = gql `
  mutation deleteBooking($_id: ID!) {
  deleteBooking (_id: $_id){
    _id
  }
}

`

export const DELETE_ORDER = gql `
  mutation deleteOrder($_id: ID!, $bookingId: ID!) {
  deleteOrder (_id: $_id, bookingId: $bookingId) {
    _id
  }
}

`
