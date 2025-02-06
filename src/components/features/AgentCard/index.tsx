import { Flex } from '@/styles/global';
import { Description, Value, Title, Container, Metrics } from './styles';
import { SocialNetworks } from '../SocialNetworks';
import { RuleSet } from 'styled-components';
import { ImageWithFallback } from '../ImageWithFallback';
import { useRouter } from 'next/navigation';
import { AppRoutes } from '@/constants/routes';
import { IToken } from '@/types/common';
import { shortNumber } from '@/utils/formatters';
import { ChainId, ChainsIconPath } from '@/constants/blockchain/networks';

interface AgentCardProps {
  // onClick: () => void;
  styles?: RuleSet<object>;
  hasMetrics?: boolean;
  agent: IToken;
}

export const AgentCard = ({ styles, hasMetrics = false, agent }: AgentCardProps) => {
  const router = useRouter();
  const { imageUrl, name, symbol, marketCap, description, siteUrl, socialUrl, chatUrl } = agent || {};
  return (
    <Container onClick={() => router.push(AppRoutes.TOKEN)} $styles={styles} role='link'>
      <Flex $gap={12} $align='center'>
        <ImageWithFallback
          fill
          alt='Agent logo'
          src={imageUrl}
          loading='lazy'
          style={{ objectFit: 'cover', borderRadius: '4px' }}
          sizes='100%'
          widthSkeleton={100}
          heightSkeleton={100}
        />
        <Flex $direction={'column'} $gap={6}>
          <Title>{name}</Title>
          <Flex $gap={4} $align='center'>
            <ImageWithFallback
              fill
              alt='Token logo'
              src={ChainsIconPath[ChainId.SONIC]}
              loading='lazy'
              style={{ objectFit: 'cover' }}
              sizes='100%'
              widthSkeleton={16}
              heightSkeleton={16}
            />
            <span>{symbol}</span>
          </Flex>
          <Flex $gap={4} $align='baseline'>
            <span>Market cap:</span>
            <Value>{`$${shortNumber(+marketCap)}`}</Value>
          </Flex>
          <SocialNetworks
            position='card'
            siteUrl={siteUrl}
            socialUrl={socialUrl}
            chatUrl={chatUrl}
            styles={{ flexDirection: 'row' }}
          />
        </Flex>
      </Flex>
      <Description $hasMetrics={hasMetrics}>{description}</Description>
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
