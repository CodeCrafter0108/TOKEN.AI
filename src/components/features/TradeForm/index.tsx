import ChangeIcon from '@/assets/icons/change.svg';
import ConnectButton from '@/components/features/ConnectButton';
import Button from '@/components/shared/Button';
import { ButtonVariants } from '@/components/shared/Button/types';
import { getGraphClient } from '@/config/graph/config';
import { ChainId } from '@/constants/blockchain/networks';
import { GetAgents } from '@/graphql/queries/GetAgents';
import { useDebounce } from '@/hooks/useDebounce';
import { Flex } from '@/styles/global';
import { IToken, ITokensData } from '@/types/common';
import { formatNumber } from '@/utils/formatters';
import { validateNumberInputValue } from '@/utils/validateNumberInputValue';
import { useQuery } from '@apollo/client';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import CurrencyInput from './components/CurrencyInput';
import { QuoteDetails } from './components/QuoteDetails';
import SelectTokenModal from './components/SelectTokenModal';
import SlippageModal from './components/SlippageModal';
import { DEFOULT_DEADLINE, DEFOULT_SLIPAGE } from './components/SlippageModal/constants';
import { ChangeButton, Form, FormTitle, Separator, StyledSettingIcon, SwapInputsWrapper, Wrapper } from './styles';
import { AmountType } from './types';
import { SlippageType } from './components/SlippageModal/types';
import { useBalances } from '@/hooks/useBalances';

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
    onError: (error) => console.error(error),
    onCompleted: (data) => {
      setAgent0(data.tokens[0]); //TODO change
      setAgent1(data.tokens[1]); //TODO change
    }
  });

  useBalances({agents: agents?.tokens});

  // const [amount, setAmount] = useState<bigint>(0n);
  const [amountIn, setAmountIn] = useState<string>('');
  const [amountOut, setAmountOut] = useState<string>('');
  const [amountType, setAmountType] = useState<AmountType>(AmountType.IN);
  // // const [slippage, setSlippage] = useState<SlippageType | number>(SlippageType.AUTO);

  const [isSlipageModalOpen, setIsSlipageModalOpen] = useState<boolean>(false);
  const [isSelectModalOpen, setIsSelectModalOpen] = useState<boolean>(false);

  // const [modalTokenSelectType, setModalTokenSelectType] = useState<AmountType>(amountType);
  // const [showModalTokenSelect, setShowModalTokenSelect] = useState(false);

  // const [swapProcessing, setSwapProcessing] = useState(false);
  // const [approveProcessing, setApproveProcessing] = useState(false);
  // const [processingType, setProcessingType] = useState<TokenSwapProcessingType | null>(null);

  // const [fromToken, setFromToken] = useState<IToken>(nativeToken as IToken);
  // const [toToken, setToToken] = useState<IToken>(tokens?.filter((t) => t.isAvailable)[0] as IToken);

  const debouncedAmountIn = useDebounce(amountIn);
  const debouncedAmountOut = useDebounce(amountOut);

  const handleSwap = (e: React.FormEvent<HTMLFormElement>) => {
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

  const handleSelectAgent = useCallback(
    (agent: IToken) => {
      if (amountType === AmountType.IN) {
        setAgent0(agent);
      } else {
        setAgent1(agent);
      }
      handleReset();
      setIsSelectModalOpen(false);
    },
    [amountType]
  );

  const handleReset = () => {
    setAmountIn('');
    setAmountOut('');
  };

  const handleToggleAmountType = () => {
    const type = amountType === AmountType.IN ? AmountType.OUT : AmountType.IN;
    handleReset();
    setAmountType(type);
    setAgent0(agent1);
    setAgent1(agent0);
  };

  const handleOpenModal = useCallback((type: AmountType) => {
    setAmountType(type);
    setIsSelectModalOpen(true);
  }, []);

  const agentList: IToken[] = useMemo(() => {
    if (amountType === AmountType.IN) {
      return agents?.tokens?.filter((agent) => agent.id !== agent1?.id) as IToken[];
    } else {
      return agents?.tokens?.filter((agent) => agent.id !== agent0?.id) as IToken[];
    }
  }, [amountType, agents, agent0, agent1]);

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
            balance={'0'}
            onChange={(v) => handleChange(v, AmountType.IN)}
            onSelect={handleOpenModal}
            onMax={() => console.log('OnMAX')}
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
            balance={'0'}
            onChange={(v) => handleChange(v, AmountType.OUT)}
            onSelect={handleOpenModal}
            onMax={() => console.log('OnMAX')}
          />
        </SwapInputsWrapper>
        <QuoteDetails />
        {isConnected ? <Button type='submit'>Swap</Button> : <ConnectButton />}
      </Form>
      <SelectTokenModal
        isOpen={isSelectModalOpen}
        onClose={() => setIsSelectModalOpen(false)}
        agentList={agentList}
        handleSelectAgent={handleSelectAgent}
        agent0={agent0}
        agent1={agent1}
        amountType={amountType}
      />
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
