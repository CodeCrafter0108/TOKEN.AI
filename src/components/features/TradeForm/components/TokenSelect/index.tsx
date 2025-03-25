import { Flex } from '@/styles/global';
import { memo } from 'react';
// import { useActiveChainId } from '@/hooks/useActiveChainId';
import ChevronIcon from '@/assets/icons/chevron.svg';
import { ImageWithFallback } from '@/components/features/ImageWithFallback';
import { Skeleton } from '@/components/shared/Skeleton';
import { AmountType } from '../../types';
import { TokenSelectWrapper } from './styles';
import { IToken } from '@/types/common';

interface TokenSelectProps {
  agent?: IToken;
  valueType?: AmountType;
  selectable?: boolean;
  onSelect: (valueType: AmountType) => void;
}

const TokenSelect = ({ agent, valueType, selectable = true, onSelect }: TokenSelectProps) => {
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
          {agent && (
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
          )}
          {agent && (
            <Flex $align='center' $gap={8}>
              {agent.symbol}
            </Flex>
          )}
          {!agent && <Skeleton width={95} height={24} borderRadius={'4px'} />}
        </Flex>

        {selectable && <ChevronIcon style={{ minWidth: '14px' }} />}
      </Flex>
    </TokenSelectWrapper>
  );
};

export default memo(TokenSelect);
