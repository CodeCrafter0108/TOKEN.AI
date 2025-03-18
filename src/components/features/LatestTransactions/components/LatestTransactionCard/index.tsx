import { ImageWithFallback } from '@/components/features/ImageWithFallback';
import { Flex } from '@/styles/global';
import { Info, Card, Title } from './styles';
import { cardVariants } from './constant';

interface LatestTransactionCardProps {
  isNewCard: boolean;
  id: number;
}

export const LatestTransactionCard = ({ isNewCard, id }: LatestTransactionCardProps) => {
  return (
    <Card
      aria-label='button'
      $isSell={true}
      $isNew={isNewCard}
      layout
      custom={isNewCard}
      variants={cardVariants}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{
        duration: 0.5,
        layout: { duration: 0.2 }
      }}
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
