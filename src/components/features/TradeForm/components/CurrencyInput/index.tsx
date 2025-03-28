import WalletIcon from '@/assets/icons/wallet.svg';
import { Flex } from '@/styles/global';
import { IToken } from '@/types/common';
import { ChangeEvent, memo, useCallback, useState } from 'react';
import { AmountType } from '../../types';
import SelectTokenModal from '../SelectTokenModal';
import TokenSelect from '../TokenSelect';
import { CurrencyWrapperBalance, CurrencyWrapperSelect, FiatValue, Label, StyledInput, Wrapper } from './styles';
import { useAccount } from 'wagmi';

interface CurrencyInputProps {
  value: string;
  label: string;
  onChangeAmountType: (type: AmountType) => void;
  onSelectAgent: (agent: IToken) => void;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onMax: (type: AmountType) => void;
  valueType: AmountType;
  disabled?: boolean;
  agent?: IToken;
  valueUsd?: string;
  balance?: string;
  selectable?: boolean;
  agentList?: IToken[];
}

const CurrencyInput = ({
  agentList,
  agent,
  valueType,
  valueUsd,
  balance,
  selectable,
  value,
  onChange,
  onChangeAmountType,
  onSelectAgent,
  label,
  onMax
}: CurrencyInputProps) => {
  const { isConnected } = useAccount();
  const [isSelectModalOpen, setIsSelectModalOpen] = useState<boolean>(false);

  const handleOpenModal = useCallback(
    (type: AmountType) => {
      onChangeAmountType(type);
      setIsSelectModalOpen(true);
    },
    [onChangeAmountType]
  );

  const handleSelectAgent = useCallback(
    (agent: IToken) => {
      onSelectAgent(agent);
      setIsSelectModalOpen(false);
    },
    [onSelectAgent]
  );

  return (
    <Wrapper>
      <Label htmlFor={label}>{label}</Label>
      <StyledInput
        value={value}
        id={label}
        onChange={onChange}
        placeholder='0'
        style={{ pointerEvents: valueType === AmountType.IN ? 'auto' : 'none' }}
      />
      <CurrencyWrapperBalance>
        <Flex $align='center'>
          <FiatValue>~ ${valueUsd}</FiatValue>
        </Flex>
      </CurrencyWrapperBalance>

      <CurrencyWrapperSelect>
        <TokenSelect agent={agent} valueType={valueType} selectable={selectable} onSelect={handleOpenModal} />
        <Flex
          $gap={5}
          $align='center'
          $justify='flex-end'
          style={{
            cursor: 'pointer',
            fontSize: '12px',
            pointerEvents: isConnected && valueType === AmountType.IN ? 'auto' : 'none'
          }}
          onClick={() => onMax(valueType)}
          role='button'
          aria-label='Max balance'
        >
          <WalletIcon />
          <FiatValue>{balance}</FiatValue>
        </Flex>
      </CurrencyWrapperSelect>
      <SelectTokenModal
        isOpen={isSelectModalOpen}
        onClose={() => setIsSelectModalOpen(false)}
        agentList={agentList}
        handleSelectAgent={handleSelectAgent}
        currentAgent={agent}
      />
    </Wrapper>
  );
};

export default memo(CurrencyInput);
