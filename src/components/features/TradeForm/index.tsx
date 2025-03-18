import ChangeIcon from '@/assets/icons/change.svg';
import ConnectButton from '@/components/features/ConnectButton';
import Button from '@/components/shared/Button';
import { ButtonVariants } from '@/components/shared/Button/types';
import { Flex } from '@/styles/global';
import { validateNumberInputValue } from '@/utils/validateNumberInputValue';
import { ChangeEvent, useState } from 'react';
import { useAccount } from 'wagmi';
import CurrencyInput from './components/CurrencyInput';
import { QuoteDetails } from './components/QuoteDetails';
import SelectTokenModal from './components/SelectTokenModal';
import SlippageModal from './components/SlippageModal';
import { ChangeButton, Form, FormTitle, Separator, SwapInputsWrapper, Wrapper, StyledSettingIcon } from './styles';
import { AmountType } from './types';

interface TradeFormProps {
  styles?: React.CSSProperties;
}

export const TradeForm = ({ styles }: TradeFormProps) => {
  const { isConnected } = useAccount();

  // const { switchChain } = useSwitchChain();

  // const [amount, setAmount] = useState<bigint>(0n);
  const [amountIn, setAmountIn] = useState('');
  const [amountOut, setAmountOut] = useState('');
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

  // const debouncedAmountIn = useDebounce(amountIn);
  // const debouncedAmountOut = useDebounce(amountOut);

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

  const handleReset = () => {
    setAmountIn('');
    setAmountOut('');
  };

  const handleToggleAmountType = () => {
    // if (!fromToken || !toToken) return;

    const type = amountType === AmountType.IN ? AmountType.OUT : AmountType.IN;
    // const _fromToken = fromToken;
    // const _toToken = toToken;

    handleReset();
    setAmountType(type);
    // setFromToken(_toToken);
    // setToToken(_fromToken);
  };

  // const handleSwitchChain = () => {
  //   switchChain({ chainId: ChainId.SONIC });
  // };

  const handleOpenModal = (type: AmountType) => {
    setAmountType(type);
    setIsSelectModalOpen(true);
    handleReset();
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
            label='sell'
            value={amountIn}
            valueUsd={'0'}
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
            label='buy'
            value={amountOut}
            valueUsd={'2'}
            valueType={AmountType.OUT}
            balance={'0'}
            onChange={(v) => handleChange(v, AmountType.OUT)}
            onSelect={handleOpenModal}
            onMax={() => console.log('OnMAX')}
          />
        </SwapInputsWrapper>
        <QuoteDetails />
        {isConnected ? (
          <Button type='submit'>
              Swap
          </Button>
        ) : (
          <ConnectButton />
        )}
      </Form>
      <SelectTokenModal isOpen={isSelectModalOpen} onClose={() => setIsSelectModalOpen(false)} />
      <SlippageModal isOpen={isSlipageModalOpen} onClose={() => setIsSlipageModalOpen(false)} />
    </Wrapper>
  );
};
