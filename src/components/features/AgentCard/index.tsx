import Verified from '@/assets/icons/verified.svg';
import { ChainId, CHAINS_ICON_PATH } from '@/constants/blockchain/networks';
import { AppRoutes } from '@/constants/routes';
import { Flex } from '@/styles/global';
import { IToken } from '@/types/common';
import { shortNumber } from '@/utils/formatters';
import { useRouter } from 'next/navigation';
import { css, RuleSet } from 'styled-components';
import { ImageWithFallback } from '../ImageWithFallback';
import { SocialNetworks } from '../SocialNetworks';
import {
  Bar,
  BarTitle,
  BarValue,
  BarWrapper,
  Container,
  Description,
  Grid,
  Metrics,
  Title,
  Value,
  SocialNetworkWrapper
} from './styles';

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
          style={{ objectFit: 'cover', borderRadius: '50%' }}
          sizes='100%'
          widthSkeleton={70}
          heightSkeleton={70}
        />
        <Grid $hasMetrics={hasMetrics}>
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
          {!hasMetrics && (
            <Flex $gap={4} $align='baseline'>
              <span>Market cap:</span>
              <Value>{`$${shortNumber(+marketCap)}`}</Value>
            </Flex>
          )}
          {hasMetrics && (
            <SocialNetworkWrapper>
              <SocialNetworks
                position='card'
                siteUrl={siteUrl}
                socialUrl={socialUrl}
                chatUrl={chatUrl}
                styles={css`
                  flex-direction: 'row';
                `}
              />
            </SocialNetworkWrapper>
          )}
        </Grid>
      </Flex>
      {!hasMetrics ? (
        <>
          <Flex $gap={12}>
            <SocialNetworks
              position='card'
              siteUrl={siteUrl}
              socialUrl={socialUrl}
              chatUrl={chatUrl}
              styles={css`
                flex-direction: 'column';
              `}
            />
            <Description $hasMetrics={hasMetrics}>{description}</Description>
          </Flex>
        </>
      ) : (
        <Description $hasMetrics={hasMetrics}>{description}</Description>
      )}
      {!hasMetrics ? (
        <>
          <Flex $align='center' $justify='space-between'>
            <BarTitle>Progress market cap</BarTitle>
            <BarValue>31M$</BarValue>
          </Flex>
          <BarWrapper>
            <Bar width={33} />
          </BarWrapper>
        </>
      ) : (
        <Metrics>
          <Flex $gap={4} $align='baseline' style={{ width: 'auto' }}>
            <span>Market cap:</span>
            <Value>$4.39k</Value>
          </Flex>
          <Flex $gap={4} $align='baseline' style={{ width: 'auto' }}>
            <Verified />
            <span>Liquidity Pool:</span>
            <Value>$4.39k</Value>
          </Flex>
        </Metrics>
      )}
    </Container>
  );
};
