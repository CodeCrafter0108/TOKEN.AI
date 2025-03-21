import { launcherContract, SONIC_DECIMALS, sonicOracle } from '@/constants/blockchain/contracts';
import { useAccount, useBalance, useReadContract } from 'wagmi';
import launcherAbi from '@/config/abi/launcher.json';
import { TOTAL_SUPPLY } from '../schema';
import BigNumber from 'bignumber.js';
import oracleAbi from '@/config/abi/sonicOracle.json';
import { formatUnits } from 'viem';
import { useMemo } from 'react';

interface UseGetNativeTokensArgs {
  percent?: string;
  chainId?: number;
  isError: boolean;
}

interface UseGetNativeTokensReturnType {
  nativeTokensAmount: bigint | undefined;
  buyTokensAmount: bigint | undefined;
  nativeTokePriceUsd: number;
  userNativeBalance: bigint | undefined;
}

export const useGetNativeTokens = ({
  percent,
  chainId,
  isError
}: UseGetNativeTokensArgs): UseGetNativeTokensReturnType => {
  const { address } = useAccount();
  const buyTokensAmount: bigint | undefined = percent
    ? BigInt(new BigNumber(TOTAL_SUPPLY).multipliedBy(percent).dividedBy(100).toFixed(0))
    : undefined;

  const { data: nativeTokensAmount } = useReadContract({
    address: launcherContract,
    abi: launcherAbi,
    chainId,
    functionName: 'quoteInitialBuy',
    args: [buyTokensAmount],
    query: { enabled: !!buyTokensAmount && !isError }
  });

  const { data: sonicPrice } = useReadContract({
    address: sonicOracle,
    abi: oracleAbi,
    chainId,
    functionName: 'latestAnswer',
    query: { enabled: typeof nativeTokensAmount === 'bigint' }
  });

  const { data: balance } = useBalance({ address, chainId, query: { enabled: !!address && !!buyTokensAmount } });

  const nativeTokePriceUsd: number = typeof sonicPrice === 'bigint' ? +formatUnits(sonicPrice, SONIC_DECIMALS) : 0;

  return useMemo(() => {
    return {
      nativeTokensAmount: nativeTokensAmount as bigint | undefined,
      buyTokensAmount,
      nativeTokePriceUsd,
      userNativeBalance: balance?.value
    };
  }, [nativeTokensAmount, buyTokensAmount, nativeTokePriceUsd, balance]);
};
