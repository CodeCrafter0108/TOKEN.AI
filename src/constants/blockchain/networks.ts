import { sonic } from 'wagmi/chains';

export enum ChainId {
  SONIC = sonic.id
}

export const CHAINS_NAME: Record<ChainId, string> = {
  [ChainId.SONIC]: sonic.name
};

export const CHAINS_ICON_PATH: Record<ChainId, string> = {
  [ChainId.SONIC]: '/images/networks/sonic.png'
};

export const SUPPORTED_CHAINS = [ChainId.SONIC] as const;

export type SupportedChainId = (typeof SUPPORTED_CHAINS)[number];

export const DEFAULT_CHAIN_ID = ChainId.SONIC;
