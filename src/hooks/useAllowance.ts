import { ZERO_ADDRESS } from '@/constants/blockchain/contracts';
import { useEffect, useMemo } from 'react';
import { Abi, Address, parseUnits } from 'viem';
import { useAccount, useReadContract, UseReadContractReturnType } from 'wagmi';

interface UseAllowanceProps {
  tokenAddress?: Address;
  spenderAddress: Address;
  tokenAbi: Abi;
  amount: string;
  decimals?: number;
}

interface ReturnUseAllowanceType {
  allowance: bigint;
  isNeedApprove: boolean;
  refetchAllowance: UseReadContractReturnType['refetch'];
}

export const useAllowance = ({
  tokenAddress,
  spenderAddress,
  tokenAbi,
  amount,
  decimals
}: UseAllowanceProps): ReturnUseAllowanceType => {
  const { address } = useAccount();
  const { data, refetch: refetchAllowance } = useReadContract({
    address: tokenAddress,
    abi: tokenAbi,
    functionName: 'allowance',
    args: [address, spenderAddress],
    query: { enabled: false }
  });

  const allowance: bigint = (data as bigint) ?? 0n;

  const isNeedApprove: boolean = useMemo(() => {
    if (tokenAddress === ZERO_ADDRESS) return false;
    return parseUnits(amount, decimals ?? 0) > allowance;
  }, [allowance, amount, decimals, tokenAddress]);

  useEffect(() => {
    if (amount && amount !== '0') refetchAllowance();
  }, [amount, refetchAllowance]);

  return { allowance, isNeedApprove, refetchAllowance };
};
