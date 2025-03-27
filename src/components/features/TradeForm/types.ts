import { Address } from "viem";
import { ChainId } from '@/constants/blockchain/networks';

export enum AmountType {
  IN,
  OUT,
  NONE
}

export interface TokenSwapProps {
  tokens?: { id: string; name: string }[]; //TODO : change type; //IToken[];
  nativeToken?: { id: string; name: string }[]; //TODO : change type; //IToken;
  onSwap: () => void;
  onApprove: () => void;
}

export type QuoterArgs = { addressFrom?: Address; addressTo?: Address; amount: bigint; chainId?: ChainId };