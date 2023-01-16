import { gql } from '@apollo/client';

export const QUERY_All_USERS = gql`
  query all {
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

export const QUERY_ALL_NANNIES = gql`
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

export const QUERY_SINGLE_NANNY = gql`
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

export const QUERY_ME = gql`
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

export const QUERY_SINGLE_ORDER = gql `
query order($orderId: ID!)  {
  order(_id: $orderId) {
    _id
    purchaseDate
    bookings {
      _id
    }
  }
}
`


export const QUERY_ALL_BOOKINGS = gql `
query bookings {
  bookings {
    _id
    createdAt
    bookedDate
    price
    bookedBy{
      _id
      email
      firstName
      LastName
    }
  }
  }
`

export const QUERY_USER_BOOKING = gql `
query userBooking ($userId: ID!) {
  userBooking (_id: userId) {
    _id
    createdAt
    bookedDate
    price
    bookedBy{
      _id
      email
      firstName
      LastName
    }
  }
  }
`

export const QUERY_SINGLE_BOOKING = gql `
query singleBooking($bookingId: ID!)  {
  order(_id: $bookingId) {
    _id
    createdAt
    bookedDate
    price
    bookedBy{
      _id
      email
      firstName
      LastName
    }
  }
}
`
