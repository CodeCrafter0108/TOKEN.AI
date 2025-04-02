import { gql } from '@apollo/client';

export const GetLastTransactions = gql`
  query GetLastTransactions ($timestampSwap: String, $timestampLaunch: String) {
    lastSwaps: swaps(orderBy: blockTimestamp, orderDirection: desc, first: 20, where: { blockTimestamp_gt: $timestampSwap}) {
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
    lastLaunchs: tokens(
      orderBy: blockTimestamp
      orderDirection: desc
      first: 10
      where: { blockTimestamp_gt: $timestampLaunch }
    ) {
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
