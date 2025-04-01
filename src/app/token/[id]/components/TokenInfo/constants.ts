import { IToken, ITokenData24h } from '@/types/common';
import { CalculatePriceChangeReturn } from './types';

export const TIME_MS = {
  MIN: 60 * 1000,
  FIVE_MIN: 60 * 5 * 1000,
  HOUR: 60 * 60 * 1000,
  SIX_HOUR: 6 * 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000
};

export const tokenPriceZeroData: CalculatePriceChangeReturn = {
  change: 0,
  increased: false,
  decreased: false,
};

export const token24hZeroData: ITokenData24h = {
  id: '',
  date: '0',
  price: '0',
  token: {} as IToken,
  buys24h: '0',
  sells24h: '0',
  buyVolumeUsd24h: '0',
  sellVolumeUsd24h: '0',
  sellers24h: [],
  buyers24h: []
};
