import { gql } from "@apollo/client";

const GET_PRODUCT = gql`
  query GetProduct($sku: String!) {
    products(filter: { sku: { eq: $sku } }) {
      items {
        id
        name
        sku
        description {
          html
        }
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
          }
        }
      }
    }
  }
`;

export default GET_PRODUCT;
