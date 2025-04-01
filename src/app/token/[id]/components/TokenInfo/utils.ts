import { ITokenPriceData } from "@/types/common";
import { TIME_MS, tokenPriceZeroData } from "./constants";
import { CalculatePriceChangeReturn } from "./types";

export const isValidTimeframe = (timestamp: number, timeframe: number): boolean => {
  const now = Date.now();
  const date = timestamp * 1000;

  if (timeframe === TIME_MS.FIVE_MIN) {
    const diff = (now - date) / TIME_MS.MIN;
    return diff < 5;
  }

  if (timeframe === TIME_MS.HOUR) {
    const diff = (now - date) / TIME_MS.MIN;
    return diff < 60;
  }

  if (timeframe === TIME_MS.SIX_HOUR) {
    const diff = (now - date) / TIME_MS.HOUR;
    return diff < 6;
  }

  if (timeframe === TIME_MS.DAY) {
    const diff = (now - date) / TIME_MS.HOUR;
    return diff < 24;
  }

  return false;
};

export const calculatePriceChange = (
  currentPrice: number,
  lastPrice: number,
): CalculatePriceChangeReturn => {
  if (!lastPrice) return { change: 0, increased: false, decreased: false };

  const diff = currentPrice - lastPrice;
  const changePercent = (diff / lastPrice) * 100;

  return {
      change: Number(changePercent.toFixed(2)),
      increased: diff > 0,
      decreased: diff < 0,
  };
};

export const getPriceChange = (
  currentPrice: number,
  tokenData: ITokenPriceData | undefined,
  timeframe: number
): CalculatePriceChangeReturn => {
  const date = +(tokenData?.date ?? '0');
  const price = +(tokenData?.price ?? '0');
  return isValidTimeframe(date, timeframe)
    ? calculatePriceChange(currentPrice, price)
    : tokenPriceZeroData;

};