import { gql } from '@apollo/client';

// export const QUERY_PRODUCTS = gql`
//   query getProducts($category: ID) {
//     products(category: $category) {
//       _id
//       name
//       description
//       price
//       quantity
//       image
//       category {
//         _id
//       }
//     }
//   }
// `;

// export const QUERY_CHECKOUT = gql`
//   query getCheckout($products: [ID]!) {
//     checkout(products: $products) {
//       session
//     }
//   }
// `;

// export const QUERY_ALL_PRODUCTS = gql`
//   {
//     products {
//       _id
//       name
//       description
//       price
//       quantity
//       category {
//         name
//       }
//     }
//   }
// `;

// export const QUERY_CATEGORIES = gql`
//   {
//     categories {
//       _id
//       name
//     }
//   }
// `;

export const QUERY_USER = gql`
    query User($id: ID!) {
        user(id: $id) {
            firstName
            lastName
            email
            address
            postcode
            picture
            description
        }
    }
`;

// export const QUERY_USER = gql`
// query User($userId: ID!) {
//   user(id: $userId) {
//     address
//     description
//     email
//     firstName
//     lastName
//     picture
//     postcode
//     role
//     bookings {
//       price
//       BookedDate
//     }
//     orders {
//       bookings {
//         price
//         BookedBy {
//           _id
//           lastName
//           firstName
//           email
//         }
//         BookedDate
//       }
//       purchaseDate
//     }
//   }
// }
// `;
