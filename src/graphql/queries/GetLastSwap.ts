import { gql } from '@apollo/client';

export const GetLastSwap = gql`
  query GetLastSwap($orderBy: String, $orderDirection: String, $first: Int, $timestamp: String) {
    swaps(orderBy: $orderBy, orderDirection: $orderDirection, first: $first, where: { blockTimestamp_gt: $timestamp }) {
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
