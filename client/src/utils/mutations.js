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
      message
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




