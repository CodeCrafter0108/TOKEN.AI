import { ZERO_ADDRESS } from '@/constants/blockchain/contracts';
import { IToken } from '@/types/common';
import { useEffect, useMemo } from 'react';
import { erc20Abi } from 'viem';
import { useAccount, useBalance, useReadContracts } from 'wagmi';

interface UseBalancesProps {
  tokens?: IToken[];
}

interface UseBalancesReturn {
  refetchBalances: () => void;
  isLoadingBalances: boolean;
  agentsWithBalance?: IToken[];
}

export const useBalances = ({ tokens }: UseBalancesProps): UseBalancesReturn => {
  const { address: account } = useAccount();

  const tokensGroup: { native: IToken[]; tokens: IToken[] } = useMemo(() => {
    const native: IToken[] = tokens?.filter((token: IToken) => token.address === ZERO_ADDRESS) || [];
    const otherTokens: IToken[] = tokens?.filter((token: IToken) => token.address !== ZERO_ADDRESS) || [];
    return { native, tokens: otherTokens };
  }, [tokens]);

  const contracts = useMemo(
    () =>
      tokens
        ?.map(({ address }) => {
          if (address === ZERO_ADDRESS) return null;
          return {
            address,
            abi: erc20Abi,
            functionName: 'balanceOf',
            args: [account]
          };
        })
        .filter((contract) => contract !== null),
    [tokens, account]
  );

  const {
    data: tokensBalance,
    isError: isErrorFetchTokensBalance,
    refetch: refetchTokensBalance,
    isLoading: isLoadingTokensBalance
  } = useReadContracts({ contracts, query: { enabled: !!account && !!contracts } });

  const {
    data: nativeBalance,
    isError: isErrorNativeBalance,
    isLoading: isLoadingNativeBalance,
    refetch: refetchNativeBalance
  } = useBalance({
    address: account
  });

  const handleRefetch = (): void => {
    refetchTokensBalance();
    refetchNativeBalance();
  };

  useEffect(() => {
    if (isErrorFetchTokensBalance || isErrorNativeBalance) console.error('Error fetching balances');
  }, [isErrorFetchTokensBalance, isErrorNativeBalance]);

  const agentsWithBalance: IToken[] = useMemo(() => {
    const tokenWithBalance: IToken[] =
      tokensBalance && tokensGroup.tokens
        ? tokensBalance.map(({ result, status }, index) => ({
            ...tokensGroup.tokens[index],
            balance: status === 'success' ? (result as bigint) : 0n
          }))
        : [];

    return [
      {
        ...tokensGroup.native[0],
        balance: nativeBalance ? nativeBalance.value : 0n
      },
      ...tokenWithBalance
    ];
  }, [tokensBalance, tokensGroup, nativeBalance]);

  return {
    agentsWithBalance,
    refetchBalances: handleRefetch,
    isLoadingBalances: isLoadingNativeBalance || isLoadingTokensBalance
  };
};
