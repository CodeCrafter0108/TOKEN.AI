import { gql } from '@apollo/client';

export const GetLastLaunch = gql`
  query GetLastLaunch($orderBy: String, $orderDirection: String, $first: Int, $timestamp: String) {
    tokens(orderBy: $orderBy, orderDirection: $orderDirection, first: $first, where: { blockTimestamp_gt: $timestamp }) {
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
