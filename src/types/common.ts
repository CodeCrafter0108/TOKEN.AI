import { Address } from 'viem';

export type BigInt = string;

export interface ITokenPair {
  token0: Address;
  token1: Address;
  id: Address;
  swaps?: ISwap[];
}

export interface IToken {
  id: string;
  address: Address;
  symbol: string;
  name: string;
  price: string;
  priceInNative: string;
  imageUrl: string;
  decimals: number;
  blockTimestamp?: string;
  chatUrl?: string;
  description?: string;
  marketCap?: string;
  siteUrl?: string;
  socialUrl?: string;
  supply?: BigInt;
  tokenOwner?: Address;
  pair?: ITokenPair;
  balance?: bigint;
  liquidityPool?: string;
  token24hData?: ITokenData24h[];
  tokenPrice6h?: ITokenPriceData[];
  tokenPriceHour?: ITokenPriceData[];
  tokenPrice5m?: ITokenPriceData[];
}

export type SwapType = 'buy' | 'sell';

export interface ISwap {
  amount: BigInt;
  blockTimestamp: string;
  type: SwapType;
  id: string;
  transactionHash: string;
  price: string;
  user: Address;
  token: IToken;
}

export interface ITokenPriceData {
  id: string;
  date: string;
  token: IToken;
  price: string;
}

export interface ITokenData24h extends ITokenPriceData {
  buys24h: string;
  sells24h: string;
  buyVolumeUsd24h: string;
  sellVolumeUsd24h: string;
  sellers24h: Address[];
  buyers24h: Address[];
}

export interface ITokensData {
  tokens: IToken[];
  baseTokens: IToken[];
}

export interface ITokensGroupData {
  topAgents: IToken[];
  latestAgents: IToken[];
  marketCapAgents: IToken[];
}

export interface ITransactionsData {
  swaps: ISwap[];
  tokens: IToken[];
}

export interface ILastTransactionData {
  lastSwaps: ISwap[];
  lastLaunchs: IToken[];
}

export interface ITokenData {
  token: IToken;
}
