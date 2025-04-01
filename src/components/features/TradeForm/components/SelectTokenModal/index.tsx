import { ImageWithFallback } from '@/components/features/ImageWithFallback';
import Search from '@/components/features/Search';
import Modal from '@/components/shared/Modal';
import { ModalHeader } from '@/components/shared/Modal/components/ModalHeader';
import { useDebounce } from '@/hooks/useDebounce';
import { Flex } from '@/styles/global';
import { IToken } from '@/types/common';
import { formatBalance, formatNumber } from '@/utils/formatters';
import { memo, useMemo, useState } from 'react';
import { css } from 'styled-components';
import { formatUnits } from 'viem';
import { Description, NotFound, Title, TokenList, TokenListItem } from './styles';

interface SelectTokenModalProps {
  onClose: () => void;
  isOpen: boolean;
  agentList?: IToken[];
  handleSelectAgent: (agent: IToken) => void;
  currentAgent?: IToken;
}

const SelectTokenModal = ({ isOpen, onClose, agentList, handleSelectAgent, currentAgent }: SelectTokenModalProps) => {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue, 300);
  const filteredAgents: IToken[] = useMemo(() => {
    if (!agentList) return [];

    return agentList.filter(
      (agent) =>
        agent?.name?.toLowerCase().includes(debouncedSearchValue.toLowerCase()) ||
        agent?.symbol?.toLowerCase().includes(debouncedSearchValue.toLowerCase()) ||
        agent?.address?.toLowerCase().includes(debouncedSearchValue.toLowerCase())
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
              $isSelected={agent?.id === currentAgent?.id}
            >
              <Flex $gap={12} $align='center' style={{ width: 'auto' }}>
                <ImageWithFallback
                  src={agent?.imageUrl}
                  alt='Token logo'
                  fill
                  loading='lazy'
                  style={{ objectFit: 'cover', borderRadius: '50%' }}
                  sizes='100%'
                  widthSkeleton={24}
                  heightSkeleton={24}
                />
                <Flex $direction='column' $gap={4}>
                  <Title>{agent?.name}</Title>
                  <Description>{agent?.symbol}</Description>
                </Flex>
              </Flex>
              <Flex $direction='column' $align='flex-end' $gap={4} style={{ width: 'auto' }}>
                <Title>{formatBalance(agent?.balance, agent?.decimals)}</Title>
                <Description>{`$${formatNumber(Number(formatUnits(agent?.balance ?? 0n, agent?.decimals ?? 0)) * Number(agent?.price ?? '0'), 2)}`}</Description>
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
