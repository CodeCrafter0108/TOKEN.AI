import { gql } from '@apollo/client';

export const GetOneAgent = gql`
  query GetOneAgent($id: String, $orderBy: String, $orderDirection: String) {
    token(id: $id) {
      id
      address
      blockTimestamp
      chatUrl
      description
      imageUrl
      marketCap
      name
      price
      siteUrl
      socialUrl
      supply
      symbol
      tokenOwner
      pair {
        token0
        token1
        id
        swaps(orderBy: $orderBy, orderDirection: $orderDirection) {
          amount
          blockTimestamp
          fromAIToken
          id
          transactionHash
          price
          user
        }
      }
    }
  }
`;
