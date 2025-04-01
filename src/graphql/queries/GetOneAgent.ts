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
      liquidityPool
      priceInNative
      token24hData(orderBy: date, orderDirection: desc, first: 1) {
        id
        date
        sellers24h
        sells24h
        buys24h
        buyers24h
        buyVolumeUsd24h
        sellVolumeUsd24h
        price
      }
      tokenPrice6h(orderBy: date, orderDirection: desc, first: 1) {
        id
        date
        price
      }
      tokenPriceHour(orderBy: date, orderDirection: desc, first: 1) {
        id
        date
        price
      }
      tokenPrice5m(orderBy: date, orderDirection: desc, first: 1) {
        id
        date
        price
      }
      pair {
        token0
        token1
        id
        swaps(orderBy: $orderBy, orderDirection: $orderDirection) {
          amount
          blockTimestamp
          type
          id
          transactionHash
          price
          user
        }
      }
    }
  }
`;
