import routerAbi from '@/config/abi/router.json';
import { config } from '@/config/providers/WagmiProvider/config';
import { routerContract } from '@/constants/blockchain/contracts';
import { readContract } from 'wagmi/actions';
import { QuoterArgs } from './types';
import { IToken } from '@/types/common';
import { formatNumber } from '@/utils/formatters';

export const quoter = async ({ addressFrom, addressTo, amount, chainId }: QuoterArgs): Promise<bigint | undefined> => {
  if (!addressFrom || !addressTo) return;

  console.log('quote args', {
    address: routerContract,
    abi: routerAbi,
    chainId,
    functionName: 'quote',
    args: [addressFrom, addressTo, amount]
  });

  try {
    const qoute = await readContract(config, {
      address: routerContract,
      abi: routerAbi,
      chainId,
      functionName: 'quote',
      args: [addressFrom, addressTo, amount]
    });
    console.log('response quote', qoute);

    if (typeof qoute !== 'bigint') throw new Error('Failed to get quote');

    return qoute;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const calculateUsdValue = (agent?: IToken, amount?: string): string | undefined => {
  if (!agent || !amount) return;
  return formatNumber(+(agent?.price ?? '0') * +(amount ?? '0'), 2);
};
