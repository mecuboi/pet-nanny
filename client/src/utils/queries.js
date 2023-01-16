import { gql } from '@apollo/client';

export const QUERY_All_PROFILES = gql`
  query All {
    all {
      _id
      address
      description
      email
      firstName
      lastName
      picture
      postcode
      role
      bookings {
        id
        BookedDate
        price
        BookedBy {
          _id
        }
      }
      orders {
        _id
        purchaseDate
        bookings {
          id
          price
          BookedDate
        }
      }
    }
  }
`;

export const QUERY_ALL_Nannies = gql`
query Nannies($role: String) {
  nannies(role: $role) {
    _id
    address
    description
    email
    firstName
    lastName
    picture
    postcode
    role
    bookings {
      id
      BookedBy {
        _id
        firstName
        lastName
      }
      BookedDate
      price
    }
  }
}
`;

export const QUERY_SINGLE_Nanny = gql`
query User($nannyId: ID!, $role: String) {
  nanny(id: $nannyId, role: $role) {
    _id
    address
    description
    email
    firstName
    lastName
    picture
    postcode
    role
    bookings {
      id
      price
      BookedDate
      BookedBy {
        _id
        firstName
        lastName
      }
    }
  }
}
`;

export const QUERY_SINGLE_USER = gql`
query User($userId: ID!) {
  user(id: $userId) {
    _id
    address
    description
    email
    firstName
    lastName
    picture
    postcode
    role
    orders {
      _id
      purchaseDate
      bookings {
        id
        price
        BookedDate
      }
    }
  }
}
`;

export const GET_ME = gql`
query Me {
  me {
    _id
    firstName
    lastName
    email
    picture
    postcode
    role
    description
    address
    bookings {
      BookedBy {
        _id
        firstName
        lastName
        email
      }
      BookedDate
      id
      price
    }
    orders {
      _id
      bookings {
        BookedDate
        id
        price
      }
    }
  }
}
`
