import { AppRoutes } from "@/constants/routes";
import { TransactionType } from "./types";

export const supportedPages: string[] = Object.values(AppRoutes).filter((route) => route !== AppRoutes.LAUNCHER);
export const COUNT_LAST_TRANSACTIONS: number = 15;

export const cardData: Record<TransactionType, { color: string; label: string }> = {
  ['buy']: {
    color: '#7ec425',
    label: 'buy'
  },
  ['sell']: {
    color: '#ff9500',
    label: 'sell'
  },
  ['launch']: {
    color: '#f064c6',
    label: 'launch'
  }
};
