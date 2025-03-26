import { ImageWithFallback } from '@/components/features/ImageWithFallback';
import { Flex } from '@/styles/global';
import { ISwap } from '@/types/common';
import { formatAddress, formatNumber } from '@/utils/formatters';
import { Card, Info, Title } from './styles';
import { AppRoutes } from '@/constants/routes';
import { useRouter } from 'next/navigation';

interface LatestTransactionCardProps {
  isNewTransaction: boolean;
  transaction: ISwap;
}

export const LatestTransactionCard = ({ isNewTransaction, transaction }: LatestTransactionCardProps) => {
  const router = useRouter();
  const { token, fromAIToken, amount = '0', price = '0' } = transaction || {};
  return (
    <Card
      $isNew={isNewTransaction}
      $isSell={fromAIToken}
      role='link'
      onClick={() => router.push(`${AppRoutes.TOKEN}/${token?.address}`)}
    >
      <Flex $gap={8} $align='center'>
        <ImageWithFallback
          fill
          alt='Agent logo'
          src={token?.imageUrl}
          loading='lazy'
          style={{ objectFit: 'cover', borderRadius: '50%' }}
          sizes='100%'
          widthSkeleton={28}
          heightSkeleton={28}
        />
        <Flex $direction='column'>
          <Title>{token?.name}</Title>
          <Info>
            <span>{formatAddress(token?.address, 7, 5)}</span>
            <span
              style={{ color: fromAIToken ? '#FF9500' : 'var(--accent-clr)' }}
            >{`${fromAIToken ? 'sell' : 'buy'} $${formatNumber(+amount * +price)}`}</span>
          </Info>
        </Flex>
      </Flex>
    </Card>
  );
};
