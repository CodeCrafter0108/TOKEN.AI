import { Address } from 'viem';

export type BigInt = string;

export interface ISwapData {
  amount: BigInt;
  blockTimestamp: string;
  fromAIToken: boolean;
  id: string;
  transactionHash: string;
  price: string;
  user: Address;
}

export interface ITokenPair {
  token0: Address;
  token1: Address;
  id: Address;
  swaps?: ISwapData[];
}

export interface IToken {
  id: string;
  address: Address;
  symbol: string;
  name: string;
  price: string;
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
}

export interface ITokensData {
  tokens: IToken[];
  baseTokens: IToken[];
}

export interface ITokenData {
  token: IToken;
}
