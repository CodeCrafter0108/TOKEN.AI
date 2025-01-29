import { useMemo } from 'react';
import { Config, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { WaitForTransactionReceiptErrorType, WriteContractErrorType } from 'wagmi/actions';
import { WriteContractMutate, WriteContractMutateAsync } from 'wagmi/query';

interface UseWriteReturn {
  error: WriteContractErrorType | WaitForTransactionReceiptErrorType | null;
  isLoading: boolean;
  isSuccess: boolean;
  writeContractAsync: WriteContractMutateAsync<Config, unknown>;
  writeContract: WriteContractMutate<Config, unknown>;
  reset: () => void;
}

export const useWrite = (): UseWriteReturn => {
  const {
    writeContract,
    writeContractAsync,
    isPending: isPendingWrite,
    data: hash,
    error: errorWrite,
    reset,
  } = useWriteContract();
  const {
    isLoading: isLoadingReceipt,
    isSuccess,
    error: errorReceipt,
  } = useWaitForTransactionReceipt({
    hash,
  });

  return useMemo(
    () => ({
      error: errorWrite || errorReceipt || null,
      isLoading: isLoadingReceipt || isPendingWrite,
      isSuccess,
      writeContractAsync,
      writeContract,
      reset,
    }),
    [errorReceipt, errorWrite, isLoadingReceipt, isPendingWrite, isSuccess, writeContractAsync, writeContract, reset],
  );
};