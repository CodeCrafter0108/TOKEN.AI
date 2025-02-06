import { gql } from '@apollo/client';

export const GetAgents = gql`
  query GetAgents($orderBy: String, $orderDirection: String, $first: Int) {
    tokens(orderBy: $orderBy, orderDirection: $orderDirection, first: $first) {
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
    }
  }
`;
