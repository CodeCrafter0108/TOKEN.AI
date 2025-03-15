import { ImageWithFallback } from '@/components/features/ImageWithFallback';
import { Flex } from '@/styles/global';
import { Info, Card, Title } from './styles';

interface LatestTransactionCardProps {
  isNewCard: boolean;
  id: number;
}

export const LatestTransactionCard = ({ isNewCard, id }: LatestTransactionCardProps) => {
  return (
    <Card
      aria-label='button'
      $isNew={isNewCard}
      $isSell={true}
      layout
      initial={{ opacity: 0, x: 50, scale: 0.3 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
    >
      <Flex $gap={8} $align='center'>
        <ImageWithFallback
          fill
          alt='Agent logo'
          src={''}
          loading='lazy'
          style={{ objectFit: 'cover', borderRadius: '50%' }}
          sizes='100%'
          widthSkeleton={28}
          heightSkeleton={28}
          shape='circle'
        />
        <Flex $direction='column'>
          <Title>{id}</Title>
          <Info>
            <span>0xefd89...dg92c</span>
            <span style={{ color: '#FF9500' }}>sell $23.43</span>
          </Info>
        </Flex>
      </Flex>
    </Card>
  );
};
