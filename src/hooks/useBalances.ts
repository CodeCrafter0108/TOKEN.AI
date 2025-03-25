import { IToken, ITokenWithBalance } from '@/types/common';
import { QueryObserverResult } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { erc20Abi } from 'viem';
import { useAccount, useReadContracts } from 'wagmi';

interface UseBalancesProps {
  agents?: IToken[];
}

interface UseBalancesReturn {
  agentsWithBalance: ITokenWithBalance[];
  refetchBalances: () => Promise<QueryObserverResult>;
  isLoadingBalances: boolean;
}

export const useBalances = ({ agents }: UseBalancesProps): UseBalancesReturn => {
  const { address: account } = useAccount();
  const contracts = useMemo(
    () =>
      agents?.map(({ address }) => {
        return {
          address,
          abi: erc20Abi,
          functionName: 'balanceOf',
          args: [account]
        };
      }),
    [agents, account]
  );

  const { data, isError, refetch, isLoading } = useReadContracts({ contracts, query: { enabled: !!account && !!agents } });

  useEffect(() => {
    if (isError) console.error('Error fetching balances');
  }, [isError]);

  const agentsWithBalance: ITokenWithBalance[] = useMemo(() => {
    return data && agents
      ? data.map(({ result, status }, index) => ({
          ...agents[index],
          balance: status === 'success' ? (result as bigint) : 0n
        }))
      : [];
  }, [data, agents]);

  return { agentsWithBalance, refetchBalances: refetch, isLoadingBalances: isLoading };
};
