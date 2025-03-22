import { launcherContract, SONIC_DECIMALS, sonicOracle } from '@/constants/blockchain/contracts';
import { useAccount } from 'wagmi';
import launcherAbi from '@/config/abi/launcher.json';
import { TOTAL_SUPPLY } from '../schema';
import BigNumber from 'bignumber.js';
import oracleAbi from '@/config/abi/sonicOracle.json';
import { formatUnits } from 'viem';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getBalance, readContract } from 'wagmi/actions';
import { config } from '@/config/providers/WagmiProvider/config';

interface UseGetNativeTokensArgs {
  percent?: string;
  chainId?: number;
  isError: boolean;
}

interface NativeTokensData {
  nativeTokensAmount: bigint;
  nativeTokePriceUsd: number;
  userNativeBalance: bigint;
  buyTokensAmount?: bigint;
}

export const useGetNativeTokens = ({ percent, chainId, isError }: UseGetNativeTokensArgs): NativeTokensData | null => {
  const { address } = useAccount();
  const buyTokensAmount: bigint | undefined = useMemo(
    () => (percent ? BigInt(new BigNumber(TOTAL_SUPPLY).multipliedBy(percent).dividedBy(100).toFixed(0)) : undefined),
    [percent]
  );

  const [nativeTokenData, setNativeTokenData] = useState<NativeTokensData | null>(null);

  const fetchNativeTokensData = useCallback(async (): Promise<void> => {
    if (!percent || isError || !address) {
      setNativeTokenData(null);
      return;
    }

    try {
      const nativeTokensAmount = await readContract(config, {
        address: launcherContract,
        abi: launcherAbi,
        chainId,
        functionName: 'quoteInitialBuy',
        args: [buyTokensAmount]
      });

      const nativeTokenPrice = await readContract(config, {
        address: sonicOracle,
        abi: oracleAbi,
        chainId,
        functionName: 'latestAnswer'
      });

      const balance = await getBalance(config, {
        chainId,
        address
      });

      if (typeof nativeTokensAmount !== 'bigint' || typeof nativeTokenPrice !== 'bigint' || !balance?.value) {
        throw new Error('Failed to fetch native token data');
      }

      setNativeTokenData({
        nativeTokensAmount,
        userNativeBalance: balance.value,
        nativeTokePriceUsd: +formatUnits(nativeTokenPrice, SONIC_DECIMALS),
        buyTokensAmount
      });
    } catch (error) {
      console.error(error);
    }
  }, [address, chainId, isError, percent, buyTokensAmount]);

  useEffect(() => {
    fetchNativeTokensData();
  }, [percent]);

  return nativeTokenData;
};
