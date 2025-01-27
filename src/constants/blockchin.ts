export enum ChainId {
  SONIC = 146,
}

export const SUPPORTED_CHAINS = [ChainId.SONIC] as const;

export type SupportedChainId = (typeof SUPPORTED_CHAINS)[number];