import { ImageWithFallback } from '@/components/features/ImageWithFallback';
import Search from '@/components/features/Search';
import Modal from '@/components/shared/Modal';
import { ModalHeader } from '@/components/shared/Modal/components/ModalHeader';
import { Flex } from '@/styles/global';
import { memo } from 'react';
import { TokenList, TokenListItem, TokenName, TokenSymbol } from './styles';

interface SelectTokenModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const SelectTokenModal = ({ isOpen, onClose }: SelectTokenModalProps) => {
  return (
    <Modal isOpen={isOpen} handleClose={onClose}>
      <ModalHeader title='Select Token' onClose={onClose} />
       {/*@ts-expect-error not ckecked*/}
      <Search styles={{ marginBottom: '12px' }} />
      <TokenList>
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <TokenListItem key={index} role='button'>
              <Flex $gap={12} key={index} $align='center' style={{ width: 'auto' }}>
                <ImageWithFallback
                  src={'/temp/token.png'}
                  shape='circle'
                  alt='Token logo'
                  fill
                  loading='lazy'
                  style={{ objectFit: 'cover' }}
                  sizes='100%'
                  widthSkeleton={24}
                  heightSkeleton={24}
                />
                <Flex $direction='column' $gap={4}>
                  <TokenName>Ether</TokenName>
                  <TokenSymbol>ETH</TokenSymbol>
                </Flex>
              </Flex>
              <Flex $direction='column' $align='flex-end' $gap={4} style={{ width: 'auto' }}>
                <TokenName>0</TokenName>
                <TokenSymbol>$0</TokenSymbol>
              </Flex>
            </TokenListItem>
          ))}
      </TokenList>
    </Modal>
  );
};

export default memo(SelectTokenModal);
