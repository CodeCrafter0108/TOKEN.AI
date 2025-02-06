import { gql } from '@apollo/client';

export const GetMyAgents = gql`
  query GetMyAgents($orderBy: String, $orderDirection: String, $tokenOwner: String) {
     tokens(orderBy: $orderBy, orderDirection: $orderDirection, where: {tokenOwner: $tokenOwner}) {
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