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
        _id
        bookedDate
        price
        bookedBy {
          _id
        }
      }
      orders {
        _id
        purchaseDate
        bookings {
          _id
          price
          bookedDate
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
      _id
      bookedBy {
        _id
        firstName
        lastName
      }
      bookedDate
      price
    }
  }
}
`;

export const QUERY_SINGLE_NANNY = gql`
query user($nannyId: ID!, $role: String) {
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
      _id
      price
      bookedDate
      bookedBy {
        _id
        firstName
        lastName
      }
    }
  }
}
`;

export const QUERY_SINGLE_USER = gql`
query user($userId: ID!) {
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
        _id
        price
        bookedDate
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
      bookedBy {
        _id
        firstName
        lastName
        email
      }
      bookedDate
      _id
      price
    }
    orders {
      _id
      bookings {
        bookedDate
        _id
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
