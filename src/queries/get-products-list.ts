import { gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query GetProducts {
    products(search: "", pageSize: 10, currentPage: 1) {
      items {
        id
        name
        sku
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

export default GET_PRODUCTS;
