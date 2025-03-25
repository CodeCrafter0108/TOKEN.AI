import { IToken } from '@/types/common';
import { useEffect, useMemo } from 'react';
import { Address, erc20Abi } from 'viem';
import { useAccount, useReadContracts } from 'wagmi';

interface UseBalancesProps {
  agents?: IToken[];
}

interface BalanceType {
  address: Address;
  balance: bigint;
}
export const useBalances = ({ agents }: UseBalancesProps): BalanceType[] => {
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

  const { data, isError } = useReadContracts({ contracts, query: { enabled: !!account && !!agents } });

  useEffect(() => {
    if (isError) console.error('Error fetching balances');
  }, [isError]);

  const userBalances: BalanceType[] = useMemo(() => {
    return data?.map(({ result, status }, index) => ({
      address: agents?.[index].address ?? '0x' as Address,
      balance: status === 'success' ? (result as bigint) : 0n
    }));
  }, [data, agents]);
  console.log('🚀 ~ userBalances ~ userBalances:', userBalances);

  return userBalances;
};
