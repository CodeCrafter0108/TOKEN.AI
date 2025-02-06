import { Address } from 'viem';

export type BigInt = string;

export interface IToken {
  blockTimestamp: string;
  address: Address;
  chatUrl: string;
  description: string;
  id: string;
  imageUrl: string;
  marketCap: BigInt;
  name: string;
  price: BigInt;
  siteUrl: string;
  socialUrl: string;
  supply: BigInt;
  symbol: string;
  tokenOwner: Address;
}

export interface ITokenData  {
  tokens: IToken[]
}