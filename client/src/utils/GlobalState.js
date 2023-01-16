import { gql } from '@apollo/client';
import { createContext, useContext, useQuery } from 'react';

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
`;

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { data } = useQuery(GET_ME);
  const user = data ? data.me : null;
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);