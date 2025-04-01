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

export const HomeContent = () => {
  const { width } = useWindowSize();
  const client = useMemo(() => getGraphClient(ChainId.SONIC), []);

  const { data: agentsGroup, loading: agentsGroupLoading } = useQuery<ITokensGroupData>(GetAgentsGroup, {
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
      <TopAgents agents={topAgents} isLoading={agentsGroupLoading} />
      <Wrapper>
        <ListWrapper>
          <TitleWrapper>
            <H3>Latest</H3>
            <LinkToTopAgent title='View all Latest' params='latest' />
          </TitleWrapper>
          <AgentsList
            agents={latestAgents}
            isLoading={agentsGroupLoading}
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
            agents={marketCapAgents}
            isLoading={agentsGroupLoading}
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
