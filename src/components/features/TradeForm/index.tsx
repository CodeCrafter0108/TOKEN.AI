import ChangeIcon from '@/assets/icons/change.svg';
import ConnectButton from '@/components/features/ConnectButton';
import Button from '@/components/shared/Button';
import { ButtonVariants } from '@/components/shared/Button/types';
import { ButtonLoader } from '@/components/shared/ButtonLoader';
import routerAbi from '@/config/abi/router.json';
import { getGraphClient } from '@/config/graph/config';
import { config } from '@/config/providers/WagmiProvider/config';
import { routerContract, STABLE_TOKEN_ADDRESS, ZERO_ADDRESS } from '@/constants/blockchain/contracts';
import { ChainId } from '@/constants/blockchain/networks';
import { GetAgents } from '@/graphql/queries/GetAgents';
import { useAllowance } from '@/hooks/useAllowance';
import { useBalances } from '@/hooks/useBalances';
import { useDebounce } from '@/hooks/useDebounce';
import { useWrite } from '@/hooks/useWrite';
import { Flex } from '@/styles/global';
import { IToken, ITokensData } from '@/types/common';
import { formatBalance } from '@/utils/formatters';
import { handleError } from '@/utils/handleError';
import { validateNumberInputValue } from '@/utils/validateNumberInputValue';
import { useQuery } from '@apollo/client';
import BigNumber from 'bignumber.js';
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { Address, erc20Abi, formatUnits, parseUnits } from 'viem';
import { useAccount } from 'wagmi';
import { waitForTransactionReceipt, WaitForTransactionReceiptReturnType, writeContract } from 'wagmi/actions';
import CurrencyInput from './components/CurrencyInput';
import SlippageModal from './components/SlippageModal';
import { DEFOULT_DEADLINE, DEFOULT_SLIPAGE } from './components/SlippageModal/constants';
import { SlippageType } from './components/SlippageModal/types';
import { ChangeButton, Form, FormTitle, Separator, StyledSettingIcon, SwapInputsWrapper, Wrapper } from './styles';
import { AmountType } from './types';
import { calculateUsdValue, quoter } from './utils';
import { usePathname } from 'next/navigation';

interface TradeFormProps {
  styles?: React.CSSProperties;
}

export const TradeForm = ({ styles }: TradeFormProps) => {
  const { isConnected } = useAccount();
  const [agent0, setAgent0] = useState<IToken | undefined>();
  const [agent1, setAgent1] = useState<IToken | undefined>();

  const [slippageType, setSlippageType] = useState<SlippageType>(SlippageType.AUTO);
  const [slippage, setSlippage] = useState<number>(DEFOULT_SLIPAGE);
  const [deadLine, setDeadLine] = useState<number>(DEFOULT_DEADLINE);

  const [isApproving, setIsApproving] = useState<boolean>(false);
  const [isFetchingQuote, setIsFetchingQuote] = useState<boolean>(false);

  const [amountIn, setAmountIn] = useState<string>('');
  const [amountOut, setAmountOut] = useState<string>('');
  const [amountType, setAmountType] = useState<AmountType>(AmountType.IN);

  const [isSlipageModalOpen, setIsSlipageModalOpen] = useState<boolean>(false);

  const debouncedAmountIn: string = useDebounce(amountIn);
  const debouncedAmountOut: string = useDebounce(amountOut);

  const client = useMemo(() => getGraphClient(ChainId.SONIC), []);

  const path = usePathname();

  const {
    data: agents
    // loading: agentLoading,
  } = useQuery<ITokensData>(GetAgents, {
    client,
    variables: { orderBy: 'marketCap', orderDirection: 'desc', first: 100 },
    onError: (error) => console.error(error)
  });

  const formattedAgents: IToken[] | undefined = useMemo(() => {
    return agents?.baseTokens && agents?.tokens ? [...agents?.baseTokens, ...agents?.tokens] : undefined;
  }, [agents]);

  const { agentsWithBalance, refetchBalances } = useBalances({ tokens: formattedAgents });

  const selectedAgentId = amountType === AmountType.IN ? agent1?.id : agent0?.id;
  const sourceAgents = isConnected ? agentsWithBalance : formattedAgents;
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);

  useEffect(() => {
    if (sourceAgents) {
      const nativeToken: IToken | undefined = sourceAgents.find((token) => token.address === ZERO_ADDRESS);
      const stableToken: IToken | undefined = sourceAgents.find((token) => token.address === STABLE_TOKEN_ADDRESS);
      if (path.includes('trade') && nativeToken && stableToken) {
        if (isFirstLoad) {
          setAgent0(nativeToken);
          setAgent1(stableToken);
          setIsFirstLoad(false);
        } else {
          setAgent0((prev) => sourceAgents.find((agent) => agent.id === prev?.id) || prev);
          setAgent1((prev) => sourceAgents.find((agent) => agent.id === prev?.id) || prev);
        }
      }
      if (path.includes('token') && nativeToken) {
        if (isFirstLoad) {
          const tokenAddress: Address = path.split('/').pop() as Address;
          const currentToken: IToken | undefined = sourceAgents.find((token) => token.address === tokenAddress);
          setAgent0(nativeToken);
          setAgent1(currentToken);
          setIsFirstLoad(false);
        } else {
          setAgent0((prev) => sourceAgents.find((agent) => agent.id === prev?.id) || prev);
          setAgent1((prev) => sourceAgents.find((agent) => agent.id === prev?.id) || prev);
        }
      }
    }
  }, [sourceAgents, path, isFirstLoad]);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        if (debouncedAmountIn) {
          setIsFetchingQuote(true);
          const quote: bigint | undefined = await quoter({
            chainId: ChainId.SONIC,
            addressFrom: agent0?.address,
            addressTo: agent1?.address,
            amount: parseUnits(debouncedAmountIn, agent0?.decimals ?? 0)
          });
          if (quote) {
            setAmountOut(formatUnits(quote, agent1?.decimals ?? 0));
          }
        }
        if (!debouncedAmountIn) {
          setAmountOut('');
        }
      } catch (error) {
        handleError((error as Error).message);
      } finally {
        setIsFetchingQuote(false);
      }
    };
    fetchQuote();
  }, [debouncedAmountIn]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, type: AmountType) => {
    const value = validateNumberInputValue(e.target.value);
    setAmountType(type);
    if (type === AmountType.IN) {
      setAmountIn(value);
    } else {
      setAmountOut(value);
    }
  };

  const handleReset = useCallback((): void => {
    setAmountOut('');
    setAmountIn('');
  }, []);

  const handleChangeAmountType = useCallback((amountType: AmountType): void => {
    setAmountType(amountType);
  }, []);

  const handleMaxAmount = useCallback(
    (type: AmountType): void => {
      if (type === AmountType.IN) {
        setAmountIn(formatUnits(agent0?.balance ?? 0n, agent0?.decimals ?? 0));
      } else {
        setAmountOut(formatUnits(agent1?.balance ?? 0n, agent1?.decimals ?? 0));
      }
    },
    [agent0, agent1]
  );

  const handleSelectAgent = useCallback(
    (agent: IToken): void => {
      if (amountType === AmountType.IN) {
        setAgent0(agent);
      } else {
        setAgent1(agent);
      }
      handleReset();
    },
    [amountType, handleReset]
  );

  const handleToggleAmountType = (): void => {
    const type = amountType === AmountType.IN ? AmountType.OUT : AmountType.IN;
    handleReset();
    setAmountType(type);
    setAgent0(agent1);
    setAgent1(agent0);
  };

  const agentList: IToken[] | undefined = useMemo(
    () =>
      sourceAgents
        ?.filter((agent) => agent.id !== selectedAgentId)
        .sort(
          (a, b) =>
            +formatUnits(b.balance ?? 0n, b.decimals ?? 0) * +b.price -
            +formatUnits(a.balance ?? 0n, a.decimals ?? 0) * +a.price
        ) as IToken[],
    [selectedAgentId, sourceAgents]
  );
  const value0Usd: string | undefined = useMemo(
    () => calculateUsdValue(agent0, debouncedAmountIn),
    [agent0, debouncedAmountIn]
  );

  const value1Usd: string | undefined = useMemo(
    () => calculateUsdValue(agent1, debouncedAmountOut),
    [agent1, debouncedAmountOut]
  );

  const { writeContractAsync, isLoading: isLoadingSwap, isSuccess: isSwapSuccess, reset: resetWrite } = useWrite();

  const { isNeedApprove, refetchAllowance } = useAllowance({
    tokenAddress: agent0?.address,
    spenderAddress: routerContract,
    tokenAbi: erc20Abi,
    amount: amountIn,
    decimals: agent0?.decimals
  });

  const isLowBalance: boolean = useMemo(
    () => parseUnits(debouncedAmountIn, agent0?.decimals ?? 0) > (agent0?.balance ?? 0n),
    [agent0, debouncedAmountIn]
  );
  const handleSwap = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const minAmountOut: bigint = parseUnits(
      new BigNumber(amountOut).multipliedBy(1 - slippage / 100).toFixed(agent1?.decimals ?? 0),
      agent1?.decimals ?? 0
    );

    try {
      const swapTx = {
        functionName: 'swap',
        address: routerContract,
        chainId: ChainId.SONIC,
        abi: routerAbi,
        args: [agent0?.address, agent1?.address, parseUnits(amountIn, agent0?.decimals ?? 0), minAmountOut],
        value: agent0?.address === ZERO_ADDRESS ? parseUnits(amountIn, agent0?.decimals ?? 0) : undefined
      };

      if (isNeedApprove) {
        if (!agent0?.address) return;
        setIsApproving(true);
        const hash = await writeContract(config, {
          functionName: 'approve',
          address: agent0?.address,
          chainId: ChainId.SONIC,
          abi: erc20Abi,
          args: [routerContract, parseUnits(amountIn, agent0?.decimals ?? 0)]
        });

        const txReceipt: WaitForTransactionReceiptReturnType = await waitForTransactionReceipt(config, { hash });
        setIsApproving(false);

        if (txReceipt?.status === 'success') {
          console.log('SWAP ARGS:', swapTx);
          await writeContractAsync(swapTx);
        }
      } else {
        console.log('SWAP ARGS:', swapTx);
        await writeContractAsync(swapTx);
      }
    } catch (error) {
      console.error(error);
      setIsApproving(false);
      refetchAllowance();
      resetWrite();
      handleError((error as Error).message);
    }
  };

  useEffect(() => {
    if (isSwapSuccess) {
      toast.success('Swap success');
      refetchBalances();
      resetWrite();
      handleReset();
    }
  }, [isSwapSuccess]);

  const renderActions = (): React.ReactElement => {
    // const isDisabled: boolean =
    //   !isFetchingQuote &&
    //   (!agent0 ||
    //     !agent1 ||
    //     !debouncedAmountIn ||
    //     !amountOut ||
    //     isLowBalance ||
    //     isLoadingSwap ||
    //     isApproving ||
    //     !value0Usd ||
    //     !!(!value1Usd && debouncedAmountOut));

    const isDisabled: boolean =
      !!(
        debouncedAmountIn &&
        !isFetchingQuote &&
        (!amountOut || isLowBalance || isLoadingSwap || isApproving || !value0Usd || (!value1Usd && debouncedAmountOut))
      ) ||
      !agent0 ||
      !agent1 ||
      !amountIn ||
      !amountOut;

    let label: React.ReactNode = 'Swap';

    // const isError: boolean = !!(
    //   debouncedAmountIn &&
    //   !isFetchingQuote &&
    //   (!amountOut || isLowBalance || !value0Usd || (!value1Usd && debouncedAmountOut))
    // );

    if (isApproving) {
      label = <ButtonLoader text='Approving' />;
    } else if (isLoadingSwap) {
      label = <ButtonLoader text='Swapping' />;
    } else if (isLowBalance) {
      label = 'Insufficient balance';
    } else if (isNeedApprove) {
      label = 'Approve';
    } else if (debouncedAmountIn && (!value0Usd || (!value1Usd && debouncedAmountOut))) {
      label = 'Error calculate price';
    }
    //TODO Remove div and remove inline style after add QuoteDetails
    return (
      <div style={{ marginTop: '12px', width: '100%' }}>
        {isConnected ? (
          <Button type='submit' style={{ width: '100%' }} disabled={isDisabled}>
            {label}
          </Button>
        ) : (
          <ConnectButton styles={{ width: '100%' }} />
        )}
      </div>
    );
  };

  return (
    <Wrapper style={styles}>
      <Form onSubmit={handleSwap} autoComplete='off' autoCorrect='off'>
        <Flex $justify='space-between'>
          <FormTitle>AI token swap</FormTitle>
          <Button variants={ButtonVariants.CLEAR} onClick={() => setIsSlipageModalOpen(true)} aria-label='Settings'>
            <StyledSettingIcon />
          </Button>
        </Flex>

        <SwapInputsWrapper>
          <CurrencyInput
            agent={agent0}
            label='sell'
            value={amountIn}
            valueUsd={value0Usd || '0.00'}
            valueType={AmountType.IN}
            balance={formatBalance(agent0?.balance, agent0?.decimals)}
            onChange={(v) => handleChange(v, AmountType.IN)}
            agentList={agentList}
            onChangeAmountType={handleChangeAmountType}
            onSelectAgent={handleSelectAgent}
            onMax={handleMaxAmount}
          />
          <Separator />
          {path.includes('trade') && (
            <ChangeButton variants={ButtonVariants.CLEAR} onClick={handleToggleAmountType} aria-label='Change currency'>
              <ChangeIcon />
            </ChangeButton>
          )}
          <CurrencyInput
            agent={agent1}
            label='buy'
            value={amountOut}
            valueUsd={value1Usd || '0.00'}
            valueType={AmountType.OUT}
            balance={formatBalance(agent1?.balance, agent1?.decimals)}
            onChange={(v) => handleChange(v, AmountType.OUT)}
            agentList={agentList}
            onChangeAmountType={handleChangeAmountType}
            onSelectAgent={handleSelectAgent}
            onMax={handleMaxAmount}
          />
        </SwapInputsWrapper>
        {/* <QuoteDetails /> */}
        {renderActions()}
      </Form>
      <SlippageModal
        isOpen={isSlipageModalOpen}
        onClose={() => setIsSlipageModalOpen(false)}
        setSlippage={setSlippage}
        slippage={slippage}
        deadLine={deadLine}
        setDeadLine={setDeadLine}
        slippageType={slippageType}
        setSlippageType={setSlippageType}
      />
    </Wrapper>
  );
};
