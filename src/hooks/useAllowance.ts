import { useEffect } from 'react';
import { Abi, Address, parseUnits } from 'viem';
import { useAccount, useReadContract, UseReadContractReturnType } from 'wagmi';

interface UseAllowanceProps {
  tokenAddress: Address;
  spenderAddress: Address;
  tokenAbi: Abi;
  amount: string;
  decimals: number;
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
    query: { enabled: !!amount }
  });

  const allowance: bigint = (data as bigint) ?? BigInt(0);

  const isNeedApprove: boolean = parseUnits(amount, decimals) > allowance;

  useEffect(() => {
    refetchAllowance();
  }, [amount, refetchAllowance]);

  return { allowance, isNeedApprove, refetchAllowance };
};
