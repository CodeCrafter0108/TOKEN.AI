import { readContract } from 'wagmi/actions';
import { config } from '@/config/providers/WagmiProvider/config';
import { routerContract } from '@/constants/blockchain/contracts';
import routerAbi from '@/config/abi/router.json';
import { Address } from 'viem';
import { ChainId } from '@/constants/blockchain/networks';

type QuoterArgs = { addressFrom?: Address; addressTo?: Address; amount: bigint; chainId?: ChainId };

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
    console.log("response quote", qoute)

    if (typeof qoute !== 'bigint') throw new Error('Failed to get quote');

    return qoute;
  } catch (error) {
    console.error(error);
  }
};
