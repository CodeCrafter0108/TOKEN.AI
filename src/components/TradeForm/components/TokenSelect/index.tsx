import React, { memo } from 'react';
import { Flex } from '@/styles/global';
// import { useActiveChainId } from '@/hooks/useActiveChainId';
import { AmountType } from '../../types';
import { ImageWithFallback } from '@/components/ImageWithFallback';
import { TokenSelectWrapper } from './styles';
import { Skeleton } from '@/components/Skeleton';
import ChevronIcon from '@/assets/icons/chevron.svg';

interface TokenSelectProps {
  token?: { id: string; name: string }[]; //TODO : change type
  valueType?: AmountType;
  selectable?: boolean;
  onSelect: (valueType: AmountType) => void;
}

const TokenSelect = ({ token, valueType, selectable = true, onSelect }: TokenSelectProps) => {
  // const { chainId } = useActiveChainId();

  // const imageUrl = useMemo(() => {
  //   if (!token) return '';
  //   if (token.isNative) return `/img/tokens/${chainId}.svg`;
  //   return token.imageUrl;
  // }, [token, chainId]);

  const handleSelect = () => {
    if (!onSelect || typeof valueType === 'undefined') return;
    onSelect(valueType);
  };

  return (
    <TokenSelectWrapper>
      <Flex $align='center' onClick={handleSelect} style={{ height: '100%' }} $gap={4} role='button' aria-label='Token select'>
        <Flex $align='center' $gap={8} style={{ minWidth: '95px' }}>
          {token && (
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
          )}
          {token && (
            <Flex $align='center' $gap={8}>
              {'ETH'}
            </Flex>
          )}
          {!token && <Skeleton width={95} height={24} shape='round' borderRadius={4} />}
        </Flex>

        {selectable && <ChevronIcon style={{ minWidth: '14px' }} />}
      </Flex>
    </TokenSelectWrapper>
  );
};

export default memo(TokenSelect);
