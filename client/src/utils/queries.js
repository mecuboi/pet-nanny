import { gql } from '@apollo/client';

export const QUERY_All_PROFILES = gql`
query allProfiles {
  all {
    _id
    address
    bookings {
      id
      BookedDate
      price
    }
    description
    email
    firstName
    lastName
    orders {
      _id
      purchaseDate
    }
    picture
    postcode
    role
  }
}
`;

export const QUERY_ALL_Nannies = gql`
query allNannies {
  nannies {
    _id
    firstName
    lastName
    picture
  }
}
`;

export const QUERY_SINGLE_Nanny = gql`
query singleNanny ($nannyId: ID!) {
  nanny(id: $nannyId) {
    _id
    firstName
    lastName
    address
    description
    postcode
    picture
  }
}
`;

export const QUERY_SINGLE_USER = gql`
query singleUser($userId: ID!) {
  user(id: $userId) {
    address
    description
    email
    firstName
    lastName
    postcode
    picture
    orders {
      _id
      bookings {
        BookedDate
        CreatedAt
        price
      }
      purchaseDate
    }
  }
}

`;

