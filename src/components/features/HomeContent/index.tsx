import PlusIcon from '@/assets/icons/plus.svg';
import CommonLink from '@/components/shared/CommonLink';
import { LinkVariants } from '@/components/shared/CommonLink/types';
import { getGraphClient } from '@/config/graph/config';
import { ChainId } from '@/constants/blockchain/networks';
import { AppRoutes } from '@/constants/routes';
import { GetAgents } from '@/graphql/queries/GetAgents';
import { useWindowSize } from '@/hooks/useWindowSize';
import { NumberBreakpoints } from '@/styles/breakpoints';
import { Flex, H2, H3 } from '@/styles/global';
import { ITokensData } from '@/types/common';
import { RefetchInterval } from '@/types/enum';
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { AgentsList } from '../AgentsList';
import { ExploreList } from './components/ExploreList';
import { Hero } from './components/Hero';
import { LinkToTopAgent } from './components/LinkToTopAgent';
import SpinningCoin from './components/SpinningCoin';
import { TopAgents } from './components/TopAgents';
import { CoinAnimationWrapper, ListWrapper, TitleWrapper, Wrapper } from './styles';

export const HomeContent = () => {
  const { width } = useWindowSize();
  const client = useMemo(() => getGraphClient(ChainId.SONIC), []);

  const {
    data: latestAgents,
    loading: latestAgentsLoading,
    error: latestAgentsError
  } = useQuery<ITokensData>(GetAgents, {
    client,
    variables: { orderBy: 'blockTimestamp', orderDirection: 'desc', first: 5 },
    pollInterval: RefetchInterval.FAST
  });

  if (latestAgentsError) {
    console.error('Error fetching latest agents:', latestAgentsError);
  }

  const {
    data: marketCapAgents,
    loading: marketCapAgentsLoading,
    error: marketCapAgentsError
  } = useQuery<ITokensData>(GetAgents, {
    client,
    variables: { orderBy: 'marketCap', orderDirection: 'desc', first: 5 },
    pollInterval: RefetchInterval.FAST
  });

  if (marketCapAgentsError) {
    console.error('Error fetching market cap agents:', marketCapAgentsError);
  }

  const {
    data: topAgents,
    loading: topAgentsLoading,
    error: topAgentsError
  } = useQuery<ITokensData>(GetAgents, {
    client,
    variables: { orderBy: 'marketCap', orderDirection: 'desc', first: 30 }, //TODO change query
    pollInterval: RefetchInterval.FAST
  });

  if (topAgentsError) {
    console.error('Error fetching top agents:', topAgentsError);
  }

  return (
    <>
      <Hero />
      <H2 style={{ marginBottom: '12px' }}>Available tokens</H2>
      <TopAgents agents={topAgents?.tokens} isLoading={topAgentsLoading} />
      <Wrapper>
        <ListWrapper>
          <TitleWrapper>
            <H3>Latest</H3>
            <LinkToTopAgent title='View all Latest' params='latest' />
          </TitleWrapper>
          <AgentsList
            agents={latestAgents?.tokens}
            isLoading={latestAgentsLoading}
            hasArrow={false}
            styles={{ backgroundColor: 'var(--secondary-box-bg-clr)' }}
          />
        </ListWrapper>
        <ListWrapper>
          <TitleWrapper>
            <H3>Top Market cap</H3>
            <LinkToTopAgent title='View all Top cap' params='marketcap' />
          </TitleWrapper>
          <AgentsList
            agents={marketCapAgents?.tokens}
            isLoading={marketCapAgentsLoading}
            hasArrow={false}
            styles={{ backgroundColor: 'var(--secondary-box-bg-clr)' }}
          />
        </ListWrapper>
      </Wrapper>
      <ListWrapper>
        <H3 style={{ marginTop: width > NumberBreakpoints.md ? '80px' : '40px' }}>Explore agents</H3>
        <ExploreList />
      </ListWrapper>
      <CoinAnimationWrapper>
        <H2>Start your Agenteconomy</H2>
        <SpinningCoin />
        <CommonLink href={AppRoutes.LAUNCHER} variants={LinkVariants.SOLID_BUTTON}>
          <Flex $align='center' $gap={8} $justify='center'>
            <PlusIcon />
            <span>Launch agent</span>
          </Flex>
        </CommonLink>
      </CoinAnimationWrapper>
    </>
  );
};
