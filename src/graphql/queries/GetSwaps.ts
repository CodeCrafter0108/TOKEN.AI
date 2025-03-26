import { gql } from '@apollo/client';

export const GetSwaps = gql`
  query GetSwaps($orderBy: String, $orderDirection: String, $first: Int) {
    swaps(orderBy: $orderBy, orderDirection: $orderDirection, first: $first) {
      amount
      blockTimestamp
      fromAIToken
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
  }
`;
