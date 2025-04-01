import { gql } from '@apollo/client';

export const GetTransactions = gql`
  query GetTransactions($orderBy: String, $orderDirection: String, $first: Int) {
    swaps(orderBy: $orderBy, orderDirection: $orderDirection, first: $first) {
      amount
      blockTimestamp
      type
      id
      price
      transactionHash
      token {
        id
        address
        blockTimestamp
        imageUrl
        decimals
        name
        price
        symbol
        tokenOwner
      }
    }
    tokens(orderBy: $orderBy, orderDirection: $orderDirection, first: $first) {
      id
      address
      blockTimestamp
      imageUrl
      decimals
      name
      price
      symbol
      tokenOwner
    }
  }
`;
