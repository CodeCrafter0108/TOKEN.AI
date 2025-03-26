import ChangeIcon from '@/assets/icons/change.svg';
import ConnectButton from '@/components/features/ConnectButton';
import Button from '@/components/shared/Button';
import { ButtonVariants } from '@/components/shared/Button/types';
import { getGraphClient } from '@/config/graph/config';
import { ChainId } from '@/constants/blockchain/networks';
import { GetAgents } from '@/graphql/queries/GetAgents';
import { useBalances } from '@/hooks/useBalances';
import { useDebounce } from '@/hooks/useDebounce';
import { Flex } from '@/styles/global';
import { IToken, ITokensData } from '@/types/common';
import { formatBalance, formatNumber } from '@/utils/formatters';
import { validateNumberInputValue } from '@/utils/validateNumberInputValue';
import { useQuery } from '@apollo/client';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { formatUnits, parseUnits } from 'viem';
import { useAccount } from 'wagmi';
import CurrencyInput from './components/CurrencyInput';
import SlippageModal from './components/SlippageModal';
import { DEFOULT_DEADLINE, DEFOULT_SLIPAGE } from './components/SlippageModal/constants';
import { SlippageType } from './components/SlippageModal/types';
import { ChangeButton, Form, FormTitle, Separator, StyledSettingIcon, SwapInputsWrapper, Wrapper } from './styles';
import { AmountType } from './types';
import { quoter } from './utils';

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

  const client = useMemo(() => getGraphClient(ChainId.SONIC), []);

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

  const { agentsWithBalance } = useBalances({ tokens: formattedAgents });

  useEffect(() => {
    if (agentsWithBalance && formattedAgents) {
      setAgent0(isConnected ? agentsWithBalance[0] : formattedAgents[0]); //TODO change
      setAgent1(isConnected ? agentsWithBalance[1] : formattedAgents[1]); //TODO change
    }
  }, [agentsWithBalance, formattedAgents, isConnected]);

  // const [amount, setAmount] = useState<bigint>(0n);
  const [amountIn, setAmountIn] = useState<string>('');
  const [amountOut, setAmountOut] = useState<string>('');
  const [amountType, setAmountType] = useState<AmountType>(AmountType.IN);
  // // const [slippage, setSlippage] = useState<SlippageType | number>(SlippageType.AUTO);

  const [isSlipageModalOpen, setIsSlipageModalOpen] = useState<boolean>(false);

  // const [modalTokenSelectType, setModalTokenSelectType] = useState<AmountType>(amountType);
  // const [showModalTokenSelect, setShowModalTokenSelect] = useState(false);

  // const [swapProcessing, setSwapProcessing] = useState(false);
  // const [approveProcessing, setApproveProcessing] = useState(false);
  // const [processingType, setProcessingType] = useState<TokenSwapProcessingType | null>(null);

  // const [fromToken, setFromToken] = useState<IToken>(nativeToken as IToken);
  // const [toToken, setToToken] = useState<IToken>(tokens?.filter((t) => t.isAvailable)[0] as IToken);

  const debouncedAmountIn: string = useDebounce(amountIn);
  const debouncedAmountOut: string = useDebounce(amountOut);

  useEffect(() => {
    const fetchQuote = async () => {
      if (debouncedAmountIn) {
        const quote: bigint | undefined = await quoter({
          chainId: ChainId.SONIC,
          addressFrom: agent0?.address,
          addressTo: agent1?.address,
          amount: parseUnits(debouncedAmountIn, agent0?.decimals ?? 0)
        });
        if (quote) {
          setAmountOut(formatUnits(quote, agent1?.decimals ?? 0));
        }
      } else {
        setAmountOut('');
      }
    };
    fetchQuote();
  }, [debouncedAmountIn, agent0, agent1]);

  const handleSwap = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

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
    setAmountIn('');
    setAmountOut('');
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

  const agentList: IToken[] | undefined = useMemo(() => {
    if (amountType === AmountType.IN) {
      return (isConnected ? agentsWithBalance : formattedAgents)?.filter(
        (agent) => agent.id !== agent1?.id
      ) as IToken[];
    } else {
      return (isConnected ? agentsWithBalance : formattedAgents)?.filter(
        (agent) => agent.id !== agent0?.id
      ) as IToken[];
    }
  }, [amountType, agentsWithBalance, agent0, agent1, formattedAgents, isConnected]);

  const value0Usd: string = useMemo(() => {
    if (agent0) {
      return formatNumber(+(agent0?.price ?? '0') * +debouncedAmountIn, 2);
    } else {
      return '0';
    }
  }, [agent0, debouncedAmountIn]);

  const value1Usd: string = useMemo(() => {
    if (agent1) {
      return formatNumber(+(agent1?.price ?? '0') * +debouncedAmountOut, 2);
    } else {
      return '0';
    }
  }, [agent1, debouncedAmountOut]);

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
            valueUsd={value0Usd}
            valueType={AmountType.IN}
            balance={formatBalance(agent0?.balance, agent0?.decimals)}
            onChange={(v) => handleChange(v, AmountType.IN)}
            agentList={agentList}
            onChangeAmountType={handleChangeAmountType}
            onSelectAgent={handleSelectAgent}
            onMax={handleMaxAmount}
          />
          <Separator />
          <ChangeButton variants={ButtonVariants.CLEAR} onClick={handleToggleAmountType} aria-label='Change currency'>
            <ChangeIcon />
          </ChangeButton>
          <CurrencyInput
            agent={agent1}
            label='buy'
            value={amountOut}
            valueUsd={value1Usd}
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
        {/* Remove div and remove inline style after add QuoteDetails */}
        <div style={{ marginTop: '24px', width: '100%' }}>
          {isConnected ? (
            <Button type='submit' style={{ width: '100%' }}>
              Swap
            </Button>
          ) : (
            <ConnectButton styles={{ width: '100%' }} />
          )}
        </div>
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
