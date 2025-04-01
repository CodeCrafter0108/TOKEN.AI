import { gql } from '@apollo/client';

export const GetAgentsGroup = gql`
  query GetAgentsGroup {
  latestAgents: tokens(orderBy: blockTimestamp, orderDirection: desc, first: 6) {
    id
    address
    blockTimestamp
    chatUrl
    description
    decimals
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
  
  marketCapAgents: tokens(orderBy: marketCap, orderDirection: desc, first: 6) {
    id
    address
    blockTimestamp
    chatUrl
    description
    decimals
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

  topAgents: tokens(orderBy: marketCap, orderDirection: desc, first: 20) {
    id
    address
    blockTimestamp
    chatUrl
    description
    decimals
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

