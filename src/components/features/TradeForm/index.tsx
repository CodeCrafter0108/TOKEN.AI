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
import { ITokensData, ITokenWithBalance } from '@/types/common';
import { formatBalance, formatNumber } from '@/utils/formatters';
import { validateNumberInputValue } from '@/utils/validateNumberInputValue';
import { useQuery } from '@apollo/client';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useAccount } from 'wagmi';
import CurrencyInput from './components/CurrencyInput';
import SlippageModal from './components/SlippageModal';
import { DEFOULT_DEADLINE, DEFOULT_SLIPAGE } from './components/SlippageModal/constants';
import { SlippageType } from './components/SlippageModal/types';
import { ChangeButton, Form, FormTitle, Separator, StyledSettingIcon, SwapInputsWrapper, Wrapper } from './styles';
import { AmountType } from './types';

interface TradeFormProps {
  styles?: React.CSSProperties;
}

export const TradeForm = ({ styles }: TradeFormProps) => {
  const { isConnected } = useAccount();
  const [agent0, setAgent0] = useState<ITokenWithBalance | undefined>();
  const [agent1, setAgent1] = useState<ITokenWithBalance | undefined>();

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

  const { agentsWithBalance } = useBalances({ agents: agents?.tokens });

  useEffect(() => {
    if (agentsWithBalance) {
      setAgent0(agentsWithBalance[0]); //TODO change
      setAgent1(agentsWithBalance[1]); //TODO change
    }
  }, [agentsWithBalance]);

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

  const debouncedAmountIn = useDebounce(amountIn);
  const debouncedAmountOut = useDebounce(amountOut);

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

  const handleMaxAmount = useCallback((type: AmountType): void => {
    if (type === AmountType.IN) {
      setAmountIn((agent0?.balance || 0n).toString());
    } else {
      setAmountOut((agent1?.balance || 0n).toString());
    }
  }, [agent0, agent1]);

  const handleSelectAgent = useCallback(
    (agent: ITokenWithBalance): void => {
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

  const agentList: ITokenWithBalance[] = useMemo(() => {
    if (amountType === AmountType.IN) {
      return agentsWithBalance.filter((agent) => agent.id !== agent1?.id) as ITokenWithBalance[];
    } else {
      return agentsWithBalance.filter((agent) => agent.id !== agent0?.id) as ITokenWithBalance[];
    }
  }, [amountType, agentsWithBalance, agent0, agent1]);

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
            balance={formatBalance(agent1?.balance)}
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
            balance={formatBalance(agent1?.balance)}
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
