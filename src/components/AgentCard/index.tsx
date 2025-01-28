import { Flex } from '@/styles/global';
import { Description, Value, Title, Container, Metrics } from './styles';
import { SocialNetworks } from '../SocialNetworks';
import { RuleSet } from 'styled-components';
import { ImageWithFallback } from '../ImageWithFallback';
import { useRouter } from 'next/navigation';
import { AppRoutes } from '@/constants/routes';

interface AgentCardProps {
  // onClick: () => void;
  styles?: RuleSet<object>;
  hasMetrics?: boolean;
}

export const AgentCard = ({ styles, hasMetrics = false }: AgentCardProps) => {
  const router = useRouter();
  return (
    <Container onClick={() => router.push(AppRoutes.TOKEN)} $styles={styles} role='link'>
      <Flex $gap={12} $align='center'>
        <ImageWithFallback
          fill
          alt='Agent logo'
          src={'/temp/agent.png'}
          priority
          style={{ objectFit: 'cover', borderRadius: '4px' }}
          sizes='100%'
          widthSkeleton={100}
          heightSkeleton={100}
        />
        <Flex $direction={'column'} $gap={6}>
          <Title>Token name</Title>
          <Flex $gap={4} $align='center'>
            <ImageWithFallback
              fill
              alt='Token logo'
              src={'/temp/token.png'}
              priority
              style={{ objectFit: 'cover' }}
              sizes='100%'
              widthSkeleton={16}
              heightSkeleton={16}
            />
            <span>Token name</span>
          </Flex>
          <Flex $gap={4} $align='baseline'>
            <span>Market cap:</span>
            <Value>$31M</Value>
          </Flex>
          <SocialNetworks position='card' styles={{ flexDirection: 'row' }} />
        </Flex>
      </Flex>
      <Description $hasMetrics={hasMetrics}>
        Creating cryptocurrency enables decentralized financial systems, allowing users to exchange
      </Description>
      {hasMetrics && (
        <Metrics>
          <Flex $gap={4} $align='baseline'>
            <span>Volume:</span>
            <Value>$4.39k</Value>
          </Flex>
          <Flex $gap={4} $align='baseline'>
            <span>FDV:</span>
            <Value>$4.39k</Value>
          </Flex>
          <Flex $gap={4} $align='baseline'>
            <span>Liquidity Pool:</span>
            <Value>$4.39k</Value>
          </Flex>
        </Metrics>
      )}
    </Container>
  );
};
