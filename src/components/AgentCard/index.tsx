import { Flex } from '@/styles/global';
import { Description, MarketCapValue, Title, Container } from './styles';
import { SocialNetworks } from '../SocialNetworks';
import { RuleSet } from 'styled-components';
import { ImageWithFallback } from '../ImageWithFallback';
import { useRouter } from 'next/navigation';
import { AppRoutes } from '@/constants/routes';

interface AgentCardProps {
  // onClick: () => void;
  styles?: RuleSet<object>;
}

export const AgentCard = ({ styles }: AgentCardProps) => {
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
            <Flex $gap={4}>
              <span>Market cap:</span>
              <MarketCapValue>$31M</MarketCapValue>
            </Flex>
            <SocialNetworks position='card' styles={{ flexDirection: 'row' }} />
          </Flex>
        </Flex>
        <Description>
          Creating cryptocurrency enables decentralized financial systems, allowing users to exchange
        </Description>
      </Container>
  );
};
