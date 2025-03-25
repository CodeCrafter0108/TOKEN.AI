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
  blockTimestamp: string;
  address: Address;
  chatUrl: string;
  description: string;
  id: string;
  imageUrl: string;
  marketCap: string
  name: string;
  price: string;
  siteUrl: string;
  socialUrl: string;
  supply: BigInt;
  symbol: string;
  tokenOwner: Address;
  pair?: ITokenPair;
}

export interface ITokenWithBalance extends IToken {
  balance: bigint;
}

export interface ITokensData  {
  tokens: IToken[]
}

export interface ITokenData  {
  token: IToken
}