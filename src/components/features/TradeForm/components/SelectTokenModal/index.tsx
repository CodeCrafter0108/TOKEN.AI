import { ImageWithFallback } from '@/components/features/ImageWithFallback';
import Search from '@/components/features/Search';
import Modal from '@/components/shared/Modal';
import { ModalHeader } from '@/components/shared/Modal/components/ModalHeader';
import { useDebounce } from '@/hooks/useDebounce';
import { Flex } from '@/styles/global';
import { IToken } from '@/types/common';
import { memo, useMemo, useState } from 'react';
import { css } from 'styled-components';
import { AmountType } from '../../types';
import { NotFound, TokenList, TokenListItem, TokenName, TokenSymbol } from './styles';

interface SelectTokenModalProps {
  onClose: () => void;
  isOpen: boolean;
  agentList?: IToken[];
  handleSelectAgent: (agent: IToken) => void;
  agent0?: IToken;
  agent1?: IToken;
  amountType: AmountType;
}

const SelectTokenModal = ({
  isOpen,
  onClose,
  agentList,
  handleSelectAgent,
  amountType,
  agent0,
  agent1
}: SelectTokenModalProps) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const filteredAgents: IToken[] = useMemo(() => {
    if (!agentList) return [];

    return agentList.filter(
      (agent) =>
        agent?.name.toLowerCase().includes(debouncedSearchValue.toLowerCase()) ||
        agent?.symbol.toLowerCase().includes(debouncedSearchValue.toLowerCase()) ||
        agent?.address.toLowerCase().includes(debouncedSearchValue.toLowerCase())
    );
  }, [agentList, debouncedSearchValue]);

  return (
    <Modal
      isOpen={isOpen}
      handleClose={onClose}
      styles={css`
        min-height: 400px;
      `}
    >
      <ModalHeader title='Select Token' onClose={onClose} />
      <Search styles={{ marginBottom: '12px' }} searchValue={searchValue} setSearchValue={setSearchValue} />
      <TokenList>
        {filteredAgents.length > 0 ? (
          filteredAgents.map((agent) => (
            <TokenListItem
              key={agent.id}
              role='button'
              onClick={() => handleSelectAgent(agent)}
              $isSelected={amountType === AmountType.IN ? agent0?.id === agent.id : agent1?.id === agent.id}
            >
              <Flex $gap={12} $align='center' style={{ width: 'auto' }}>
                <ImageWithFallback
                  src={agent.imageUrl}
                  alt='Token logo'
                  fill
                  loading='lazy'
                  style={{ objectFit: 'cover', borderRadius: '50%' }}
                  sizes='100%'
                  widthSkeleton={24}
                  heightSkeleton={24}
                />
                <Flex $direction='column' $gap={4}>
                  <TokenName>{agent.name}</TokenName>
                  <TokenSymbol>{agent.symbol}</TokenSymbol>
                </Flex>
              </Flex>
              <Flex $direction='column' $align='flex-end' $gap={4} style={{ width: 'auto' }}>
                <TokenName>0</TokenName>
                <TokenSymbol>$0</TokenSymbol>
              </Flex>
            </TokenListItem>
          ))
        ) : (
          <NotFound>No agents found</NotFound>
        )}
      </TokenList>
    </Modal>
  );
};

export default memo(SelectTokenModal);
