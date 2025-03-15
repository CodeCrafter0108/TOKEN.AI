import { ChangeEvent, memo } from 'react';
import { AmountType } from '../../types';
import { Flex } from '@/styles/global';
import { formatBalance } from '@/utils/formatters';
import TokenSelect from '../TokenSelect';
import WalletIcon from '@/assets/icons/wallet.svg';
import { Wrapper, CurrencyWrapperBalance, CurrencyWrapperSelect, Label, StyledInput, FiatValue } from './styles';

interface CurrencyInputProps {
  value: string;
  label: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  token?: { id: string; name: string }[]; //TODO : change type
  valueType?: AmountType;
  valueUsd?: string;
  balance?: string;
  selectable?: boolean;
  onSelect?: (valueType: AmountType) => void;
  onMax?: (valueType: AmountType) => void;
}

const CurrencyInput = ({
  token,
  valueType,
  valueUsd,
  balance,
  selectable,
  onSelect,
  onMax,
  value,
  onChange,
  label
}: CurrencyInputProps) => {
  const handleSelect = (valueType: AmountType) => {
    if (!onSelect || typeof valueType === 'undefined') return;
    onSelect(valueType);
  };

  const handleMax = () => {
    if (!onMax || typeof valueType === 'undefined') return;
    onMax(valueType);
  };

  return (
    <Wrapper>
      <Label htmlFor={label}>{label}</Label>
      <StyledInput value={value} id={label} onChange={onChange} placeholder='0' />
      <CurrencyWrapperBalance>
        <Flex $align='center'>
          <FiatValue>~ ${valueUsd}</FiatValue>
        </Flex>
      </CurrencyWrapperBalance>

      <CurrencyWrapperSelect>
        <TokenSelect token={token} valueType={valueType} selectable={selectable} onSelect={handleSelect} />
        <Flex
          $gap={5}
          $align='center'
          $justify='flex-end'
          style={{ cursor: 'pointer', fontSize: '12px' }}
          onClick={handleMax}
          role='button'
          aria-label='Max balance'
        >
          <WalletIcon />
          <FiatValue >{formatBalance(balance, 4) || '0.00'}</FiatValue>
        </Flex>
      </CurrencyWrapperSelect>
    </Wrapper>
  );
};

export default memo(CurrencyInput);
