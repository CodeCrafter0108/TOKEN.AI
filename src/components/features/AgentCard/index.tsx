import { ChainId, CHAINS_ICON_PATH } from '@/constants/blockchain/networks';
import { AppRoutes } from '@/constants/routes';
import { Flex } from '@/styles/global';
import { IToken } from '@/types/common';
import { shortNumber } from '@/utils/formatters';
import { useRouter } from 'next/navigation';
import { RuleSet } from 'styled-components';
import { ImageWithFallback } from '../ImageWithFallback';
import { SocialNetworks } from '../SocialNetworks';
import { Container, Description, Metrics, Title, Value } from './styles';

interface AgentCardProps {
  // onClick: () => void;
  styles?: RuleSet<object>;
  hasMetrics?: boolean;
  agent: IToken;
}

export const AgentCard = ({ styles, hasMetrics = false, agent }: AgentCardProps) => {
  const router = useRouter();
  const { imageUrl, name, symbol, marketCap, description, siteUrl, socialUrl, chatUrl, address } = agent || {};
  return (
    <Container onClick={() => router.push(`${AppRoutes.TOKEN}/${address}`)} $styles={styles} role='link'>
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
              src={CHAINS_ICON_PATH[ChainId.SONIC]}
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
