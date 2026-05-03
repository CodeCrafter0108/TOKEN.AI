'use client';
import PlusIcon from '@/assets/icons/plus.svg';
import CommonLink from '@/components/shared/CommonLink';
import { LinkVariants } from '@/components/shared/CommonLink/types';
import { getGraphClient } from '@/config/graph/config';
import { ChainId } from '@/constants/blockchain/networks';
import { AppRoutes } from '@/constants/routes';
import { useWindowSize } from '@/hooks/useWindowSize';
import { NumberBreakpoints } from '@/styles/breakpoints';
import { Flex, H2, H3 } from '@/styles/global';
import { ITokensGroupData } from '@/types/common';
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
import { GetAgentsGroup } from '@/graphql/queries/GetAgentsGroup';
import { AgentsListSkeleton } from '@/components/Skeletons/AgentsListSkeleton';

interface HomeContentProps {
  initialData?: ITokensGroupData;
}

export const HomeContent = ({ initialData }: HomeContentProps) => {
  const {
    latestAgents: initialLatestAgents,
    topAgents: initialTopAgents,
    marketCapAgents: initialMarketCapAgents
  } = initialData || {};
  const { width } = useWindowSize();
  const client = useMemo(() => getGraphClient(ChainId.SONIC), []);
  const { data: agentsGroup, loading: isAgentsGroupLoading } = useQuery<ITokensGroupData>(GetAgentsGroup, {
    client,
    pollInterval: RefetchInterval.SLOW,
    onError(error) {
      console.error(error);
    }
  });

  const { topAgents, latestAgents, marketCapAgents } = agentsGroup || {};

  return (
    <>
      <Hero />
      <H2 style={{ marginBottom: '12px' }}>Available tokens</H2>
      <TopAgents
        agents={topAgents ?? initialTopAgents}
        isLoading={
          (!initialTopAgents && isAgentsGroupLoading) || (!latestAgents && !initialTopAgents && !isAgentsGroupLoading)
        }
      />
      <Wrapper>
        <ListWrapper>
          <TitleWrapper>
            <H3>Latest</H3>
            <LinkToTopAgent title='View all Latest' params='latest' />
          </TitleWrapper>
          {(!initialLatestAgents && isAgentsGroupLoading) ||
          (!latestAgents && !initialLatestAgents && !isAgentsGroupLoading) ? (
            <AgentsListSkeleton hasArrow={false} rows={6} styles={{ backgroundColor: 'var(--secondary-box-bg-clr)' }} />
          ) : (
            <AgentsList
              agents={latestAgents ?? initialLatestAgents}
              hasArrow={false}
              styles={{ backgroundColor: 'var(--secondary-box-bg-clr)' }}
            />
          )}
        </ListWrapper>
        <ListWrapper>
          <TitleWrapper>
            <H3>Top Market cap</H3>
            <LinkToTopAgent title='View all Top cap' params='marketcap' />
          </TitleWrapper>
          {(!initialTopAgents && isAgentsGroupLoading) ||
          (!latestAgents && !initialTopAgents && !isAgentsGroupLoading) ? (
            <AgentsListSkeleton hasArrow={false} rows={6} styles={{ backgroundColor: 'var(--secondary-box-bg-clr)' }} />
          ) : (
            <AgentsList
              agents={marketCapAgents ?? initialMarketCapAgents}
              hasArrow={false}
              styles={{ backgroundColor: 'var(--secondary-box-bg-clr)' }}
            />
          )}
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
